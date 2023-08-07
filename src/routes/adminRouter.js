const express = require('express');
const router = express.Router();
const tecnicasController = require('../controllers/tecnicasController');
const {isAdmin, isAuthenticated} = require('../middlewares/index')


router.post("/tecnicas", isAdmin,tecnicasController.create);
router.delete("/tecnicas", isAdmin, tecnicasController.delete);  
router.get('/tecnicas',isAdmin, tecnicasController.readAll)
router.put('/tecnicas/:id',isAdmin,tecnicasController.update)

module.exports = router;
