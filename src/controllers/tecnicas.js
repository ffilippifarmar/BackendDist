const UserDAO = require("../dao/userDao");
const ContactsEmergencyDAO = require("../dao/contactsemergencyDAO");
const User = require('../models/User');

exports.readAll = async (req, res, next) => {
  try {
    const users = await UserDAO.readAll();

    return res.status(200).send({
        users
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};


exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserDAO.readById(req.user._id);
    const contacts =  await ContactsEmergencyDAO.getContacts(req.user._id)
    if (user) {
      return res.status(200).send({
        user,contacts
      });
    }
    return res.status(404).send({
      message: "User Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.user._id

    const userUpdated = await UserDAO.update(id, req.body);

    if (userUpdated) {
      return res.status(200).send({
        userUpdated
      });
    }

    return res.status(404).send({
      message: "User Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.body;

    const userDeleted = await UserDAO.delete(id);

    if (userDeleted) {
      return res.status(200);
    }

    return res.status(404).send({
      message: "User Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};


module.exports.getContactsEmergency  = async (req, res, next) => {
    if(!req.user._id) res.status(400).send({success: false, error: "Solicitud incorrecta, id obligatorio"});
    try{
        const contacts =  await ContactsEmergencyDAO.getContacts(req.user._id)
        
        if(contacts){
            return res.status(200).send({success: true, body: contacts});
        }else{
            return res.status(404).send({success: false, error: "no existe usuario con ese id"});
        }
    }catch(error){
        return res.status(500).send({success: false, error: error.message});
    }      
};

module.exports.addContactEmergency = function (req, res){
    try {
      ContactsEmergencyDAO.create(req.body)
        .then((contact) => {
          res.status(200).send({success: true, message: "Contact Emergency added with Success!",contact});
        }).catch(error => res.status(400).send({success: false, error: error.message}))
      }catch(error){
        res.status(500).send({success: false, error: error.message});
    }
  };
  
  module.exports.removeContactEmergency = function (req, res){
    try {
      ContactsEmergencyDAO.delete(req.body.id)
        .then((contact) => {
          ContactsEmergencyDAO.getContacts(req.user._id).then((contacts) => {
            res.status(200).send({success: true, message: "Contact Emergency removed with Success!",contacts});
          }).catch(error => res.status(400).send({success: false, error: error.message}))
          
        }).catch(error => res.status(400).send({success: false, error: error.message}))
      }catch(error){
        res.status(500).send({success: false, error: error.message});
    }
  };

  exports.updateContact = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const contactUpdated = await ContactsEmergencyDAO.update(id, req.body);
  
      if (contactUpdated) {
        return res.status(200).send({
          contactUpdated
        });
      }
  
      return res.status(404).send({
        message: "Contact Not Found"
      });
    } catch (error) {
      return res.status(500).send({
        error
      });
    }
  };