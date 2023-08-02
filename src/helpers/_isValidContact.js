const Joi = require('@hapi/joi');

function _isValidContact(data){
    const schemaContact = Joi.object({
      firstName: Joi.string().min(3).max(255).required(),
      lastName: Joi.string().min(4).max(255).required(),
      email: Joi.string().min(6).max(125).required().email(),
      telephone: Joi.string().min(6).max(15).required()
  })
    
  return (schemaContact.validate(data));

}
module.exports = _isValidContact;