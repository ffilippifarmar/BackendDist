const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {_isValidRegister} = require('../helpers/index');
const Schema = mongoose.Schema; 

const jwt = require('jsonwebtoken');
const { bool, boolean } = require('@hapi/joi');

const UserSchrema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    confirmed : {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","system"]
    },
    profilePictureUrl:  {
        type: String,
        required: false,
    }
});

UserSchrema.set("toJSON", {
    transform: function(doc, returned, options) {
      returned.id = returned._id;
      delete returned._id;
    }
});


  module.exports = mongoose.model('User', UserSchrema);
  