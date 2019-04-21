const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = {
  register,
  login,
  searchCurrentUser,
  addParcell,
  searchParcellsFromUser,
  deleteParcell
};