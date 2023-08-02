const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const ContactEmergencySchrema = mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    telephone: {
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
    relation: {
        type: String,
        default: "-",
        enum : ["-","Profesional","Amigo","Amiga","Familiar","Otro"]            
    },
    profilePictureUrl:  {
        type: String,
        required: false,
    }
});

ContactEmergencySchrema.set("toJSON", {
    transform: function(doc, returned, options) {
      returned.id = returned._id;
      delete returned._id;
    }
});


  module.exports = mongoose.model('EmergencyContact', ContactEmergencySchrema,"emergencyContacts");
  