const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");
const Mailgun = require('mailgun-js');

const SECONDS_FOR_SESSION = 3600;

const register = async data => {
  const user = await User.findOne({
    email: data.email
  });
  if (user) {
    return false;
  } else {
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password
    });

    bcrypt.genSalt(10, async (err, salt) => {
      if (!err) {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (!err) {
            newUser.password = hash;
            newUser.save();
          }
        });
      }
    });
    return newUser;
  }
};

const login = async data => {
  const email = data.email;
  const password = data.password;

  let result = await User.findOne({ email });
  if (!result) {
    const error = {
      email: "User in not exist",
      success: false
    };
    return error;
  } else {
    let passwordCompareResult = await bcrypt.compare(password, result.password);
    if (passwordCompareResult) {
      const payload = {
        id: result.id,
        name: result.name,
        avatar: result.avatar,
      };
      let token = await jwt.sign(payload, "secret", {
        expiresIn: SECONDS_FOR_SESSION
      });
      if (token) {
        const decodedToken = {
          success: true,
          token: token
        };
        return decodedToken;
      }
    } else {
      const error = {
        password: "Incorrect Password",
        success: false
      };
      return error;
    }
  }
};


const searchCurrentUser = async data => {
  let result = await User.findOne({
    _id: data.id
  })
  return result
}

const addParcell = async data => {
  let result = await User.findOneAndUpdate(
    { _id: data.user },
    { $push: { parcells: { trackingNumber: data.trackingNumber, status: data.status } } },
    { new: true }
  )
  return result
}

const deleteParcell = async data => {
  if (data.page === "Parcells") {
    let result = await User.findOneAndUpdate(
      { _id: data.user },
      { $pull: { parcells: { _id: data.key } } },
      { new: true }
    )
    return result
  } else {
    let result = await User.findOneAndUpdate(
      { _id: data.user },
      { $pull: { parcells: { trackingNumber: data.trackingNumber } } },
      { new: true }
    )
    return result
  }

}

const searchParcellsFromUser = async data => {
  let result = await User.findOne(
    { _id: data.id }
  )
  return result
}

const checkStatus = async () => {
  axios.defaults.headers.common["aftership-api-key"] = 'c077d13d-c4cb-4a24-81bd-ac7e6bede95f';
  axios.defaults.headers.common["Content-Type"] = 'application/json';
  delete axios.defaults.headers.common["Authorization"];

  let users = await User.find({})
  axios.get(`https://api.aftership.com/v4/trackings/`).then(result => {
    users.forEach(res => {
      res.parcells.forEach(async parcell => {
        let singleParcell = await result.data.data.trackings.find((item) => {
          return item.tracking_number === parcell.trackingNumber
        })

        await User.findOneAndUpdate(
          { _id: res._id, 'parcells.trackingNumber': parcell.trackingNumber },
          {
            '$set': {
              'parcells.$.status': singleParcell.tag,
            }
          },
          { new: true }
        )
        if (singleParcell.tag === 'Delivered') {
          const mailgun = new Mailgun({ apiKey: `key-fd79d3396455847d96b105435265d91e`, domain: `sandboxd226c25496954cb78da67f2262aebe36.mailgun.org` });
          const message = {
            from: `vladkrav.w@gmail.com`,
            to: res.email,
            subject: 'Your parcell was delivered',
            text: `Check you parcell number - ${singleParcell.tracking_number} on post`
          }
          mailgun.messages().send(message);
        }
        if (singleParcell.tag === 'Exception') {
          const mailgun = new Mailgun({ apiKey: `key-fd79d3396455847d96b105435265d91e`, domain: `sandboxd226c25496954cb78da67f2262aebe36.mailgun.org` });
          const message = {
            from: `vladkrav.w@gmail.com`,
            to: res.email,
            subject: 'Notification',
            text: `Your parcell number - ${singleParcell.tracking_number} need some additional info for customs`
          }
          mailgun.messages().send(message);
        }
      })

    })
  })
}

module.exports = {
  register,
  login,
  searchCurrentUser,
  addParcell,
  searchParcellsFromUser,
  deleteParcell,
  checkStatus
};