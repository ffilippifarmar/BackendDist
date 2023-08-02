const UserDAO = require("../dao/userDao");
const ContactsEmergencyDAO = require("../dao/contactsemergencyDAO");
var mongoose = require('mongoose');

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

    const user = await UserDAO.readById(id);

    if (user) {
      return res.status(200).send({
        user
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
    const { id } = req.params;

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
    const { id } = req.params;

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
    if(!req.params.id) res.status(400).send({success: false, error: "Solicitud incorrecta, id obligatorio"});
    try{
        const contacts =  await ContactsEmergencyDAO.getContacts(req.params.id)
        if(contacts){
            return res.status(200).send({success: true, contacts: contacts});
        }else{
            return res.status(404).send({success: false, error: "no existe usuario con ese id"});
        }
    }catch(error){
        return res.status(500).send({success: false, error: error.message});
    }      
};

module.exports.addContactEmergency = async (req, res, next) => {
    try {
      const { id } = await ContactsEmergencyDAO.create(req.body);
  
      return res.status(200).json({
        message: "Contact Emergency added with Success!",
        id
      });
    } catch (err) {
      debug(err);
  
      return res.status(500).json({
        message: "Error when trying to Create Contact."
      });
    }
  };