const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    avatar: {
        type: String
    },
    parcells:[{
        status:String,
        trackingNumber:String,
    }]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;