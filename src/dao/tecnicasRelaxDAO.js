const mongoose = require("mongoose");
const TecnicasRelax = require("../models/TecnicasRelax");
const { bool, boolean } = require('@hapi/joi');
const TecnicasRelaxModel = require("../models/TecnicasRelax");
const User = mongoose.model("TecnicasRelax");



exports.create = async data => {

    return await TecnicasRelax.findOne({ 'name': data.name})
        .then(tecnica => {
            if (tecnica) throw new Error('La tecnica ya existe');
            else {

                const newTecnica = {
                    name: data.name,
                    description: data.description,
                    url: data.url
                };
                return TecnicasRelax.create(newTecnica);
            }
        })
        .then(TecnicaCreated => TecnicaCreated);
};

exports.readAll = async () => {
    try {
        return await TecnicasRelax.find({});
    } catch (err) {
        throw err;
    }
};

exports.readById = async id => {
    try {
        return await TecnicasRelax.findById(id);
    } catch (err) {
        throw err;
    }
};

exports.update = async (id, data) => {
    try {
        return await TecnicasRelax.findByIdAndUpdate(
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
      return await TecnicasRelax.findByIdAndRemove(id);
    } catch (err) {
      throw err;
    }
  };