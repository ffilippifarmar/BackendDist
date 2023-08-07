const tecnicasRelaxDAO = require('../dao/tecnicasRelaxDAO');
const TecnicasRelax = require('../models/TecnicasRelax');



exports.readAll = async (req, res, next) => {
  try {
    const tecnicas = await tecnicasRelaxDAO.readAll();

    return res.status(200).send({
        tecnicas
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
    const tecnica = await tecnicasRelaxDAO.readById(req.params.id);
    if (tecnica) {
      return res.status(200).send({
        tecnica
      });
    }
    return res.status(404).send({
      message: "Tecnica Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id

    const tecnicaUpdated = await tecnicasRelaxDAO.update(id, req.body);

    if (tecnicaUpdated) {
      return res.status(200).send({
        tecnicaUpdated
      });
    }

    return res.status(404).send({
      message: "Tecnica Not Found"
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

    const tecnicaDeleted = await tecnicasRelaxDAO.delete(id);
    console.log(tecnicaDeleted)
    if (tecnicaDeleted) {
      return res.status(200).send({
        message:"Tecnica eliminada"
      });
    }

    return res.status(404).send({
      message: "Tecnica Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

module.exports.create = function (req, res){
    try {
        tecnicasRelaxDAO.create(req.body)
        .then((tecnica) => {
          res.status(200).send({success: true, message: "Tecnica de Relajacion added with Success!",tecnica});
        }).catch(error => res.status(400).send({success: false, error: error.message}))
      }catch(error){
        res.status(500).send({success: false, error: error.message});
    }
  };