const mongoose = require("mongoose");
const {_isValidContact} = require('../helpers/index');
const UserModel = require("../models/User");
const EmergencyContact = mongoose.model("EmergencyContact");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { bool, boolean } = require('@hapi/joi');


exports.create = async data => {
    const { error } = _isValidContact(data);

    //Si la información no es correcta, informa el error.
    if (error) {
        throw new Error(error.details[0].message);
    }
    return await EmergencyContact.find({'email' : data.email, user: id})
        .then(contact => {
          if(contact) throw new Error('El contacto ya existe');
          else{
            if(data.profilepicture != ""){
                picture = data.profilepicture
            }  
            else{
                picture = ""
            }
            const newContact = {
                user: data.user,
                email: data.email,
                telephone: data.telephone,
                firstName: data.firstName,
                lastName: data.lastName,
                relation: data.relation,
                profilePictureUrl: picture
            };

            return EmergencyContact.create(newContact);
          }
        })
        .then(contactCreated => contactCreated);
};

exports.getContacts = async (id) => {
    try{
       return await EmergencyContact.find({
        user: id
      })
    }catch (err) {
      throw err;
    }
};

exports.readAll = async () => {
  try {
    return await EmergencyContact.find({});
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await EmergencyContact.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await EmergencyContact.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
};

exports.delete = async id => {
  try {
    return await EmergencyContact.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

exports.findContactById = async (id) => {
    return EmergencyContact.findOne(id)
        .then(contact => {
            return {
                _id: contact._id,
                email: contact.email,
                firstName: contact.firstName,
                lastName: contact.lastName,
                relation: contact.relation,
                profilePictureUrl : user.profilePictureUrl,
                telephone: contact.telephone
            };
        })
}

