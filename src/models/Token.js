const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User');


const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model("Token", tokenSchema);