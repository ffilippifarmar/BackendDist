const mongoose = require('mongoose');
require('../models/User');
require('../models/Token');


function getModelByName(name){
    return mongoose.model(name);
}

module.exports = getModelByName;