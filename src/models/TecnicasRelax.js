const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TecnicasRelaxSchrema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    url:  {
        type: String,
        required: true,
    },
    imageUrl:  {
        type: String,
        required: false,
    }
});

TecnicasRelaxSchrema.set("toJSON", {
    transform: function(doc, returned, options) {
      returned.id = returned._id;
      delete returned._id;
    }
});

module.exports = mongoose.model('TecnicasRelax', TecnicasRelaxSchrema);