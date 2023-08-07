const mongoose = require("mongoose");
const {_isValidRegister} = require('../helpers/index');
const EmergencyContact = require("../models/EmergencyContact");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { bool, boolean } = require('@hapi/joi');
const UserModel = require("../models/User");
const User = mongoose.model("User");

exports.create = async data => {
    const { error } = _isValidRegister(data);

    //Si la información no es correcta, informa el error.
    if (error) {
        throw new Error(error.details[0].message);
    }
    return await User.findOne({'email' : data.email})
        .then(user => {
          if(user) throw new Error('El usuario ya existe');
          else{
            if(data.profilePictureUrl != ""){
                picture = data.profilePictureUrl
            }  
            else{
                picture = ""
            }
            const newUser = {
                email: data.email,
                password: bcrypt.hashSync(data.password, 9),
                firstName: data.firstName,
                lastName: data.lastName,
                profilePictureUrl: picture
            };

            return User.create(newUser);
          }
        })
        .then(userCreated => userCreated);
};


exports.createGoogle = async data => {

  return await User.findOne({'email' : data.email})
      .then(user => {
        if(user) throw new Error('El usuario ya existe');
        else{
            if(data.profilepicture != ""){
                picture = data.profilepicture
            }  
            else{
                picture = ""
            }  
          const newUser = {
              email: data.email,
              password: bcrypt.hashSync(data.password, 9),
              firstName: data.firstName,
              lastName: data.lastName,
              profilePictureUrl: picture
          };
          return User.create(newUser);
        }
      })
     .then(userCreated => userCreated);
};

exports.readAll = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await User.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(
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
    return await User.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

exports.findUserById = async (id) => {
    console.log(id)
    return User.findOne(id)
        .then(user => {
            return {
                user
            };
        })
}
exports.findUserByEmail = async (email) => {

    return User.findOne({email})
        .then(user => {
            return {
                user
            };
        })
       
}
exports.findUserByEmailgoogle = async (email) => {

  return User.findOne({email})
      .then(user => {
        if(user){
          return {
              user
          };
        }
        else{
          return false;
        }
      })
}


exports.login = async (userInfo) => {
    const email= userInfo.email;
    return User.findOne({email})
        .then(user => {
            if(!user) throw new Error('Usuario o contraseña incorrectos');
            const validPassword = bcrypt.compareSync(userInfo.password, user.password);
            if(!validPassword) throw new Error('Usuario o contraseña incorrectos');

            const userObject = {
                _id: user._id,
                email: user.email,
                role: user.role
            }
            
            let data = {}
            data.accessToken = jwt.sign(Object.assign({},userObject),process.env.TOKEN_SECRET,{
                  //El token posee una duración de 8 horas.
                  expiresIn: "8h"
              }),
            data.refreshToken = jwt.sign(Object.assign({},userObject),process.env.RTOKEN_SECRET,{
                //El refresh token posee una duración de 9 horas.
                expiresIn: "9h"
              })
            data.firstName = user.firstName
            data.lastName = user.lastName
            data.email = user.email
            data.uid = user._id
            return data;
        })
}

exports.loginGoogle = async (userInfo) => {
  const email= userInfo.email;
  return User.findOne({email})
      .then(user => {
          if(!user) throw new Error('Usuario o contraseña incorrectos');
          const validPassword = bcrypt.compareSync(userInfo.password, user.password);
          if(!validPassword) throw new Error('Usuario o contraseña incorrectos');

          const userObject = {
              _id: user._id,
              email: user.email,
              role: user.role,
          }
          
          let data = {}
          data.accessToken = jwt.sign(Object.assign({},userObject),process.env.TOKEN_SECRET,{
                //El token posee una duración de 8 horas.
                expiresIn: "8h"
            }),
          data.refreshToken = jwt.sign(Object.assign({},userObject),process.env.RTOKEN_SECRET,{
              //El refresh token posee una duración de 9 minutos.
              expiresIn: "9h"
            })
          data.firstName = user.firstName
          data.lastName = user.lastName
          data.email = user.email
          data.role = user.role
          data.uid = user._id
          return data;
      })
}

