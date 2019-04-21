const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require("./routes/user");
const path = require('path')
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const cors = require("cors");;

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res
    .status(err.statusCode)
    .send(err.message)
    .json();
});

app.use(express.static(path.resolve(__dirname, "Frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "Frontend", "build", "index.html")
  );
});
app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});