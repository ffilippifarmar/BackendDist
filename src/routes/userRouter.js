const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/index');


router.post("/contacts", isAuthenticated, userController.addContactEmergency);
<<<<<<< HEAD
router.delete("/contacts", isAuthenticated, userController.removeContactEmergency);
router.get('/contacts', isAuthenticated, userController.getContactsEmergency);
router.get('/profile',isAuthenticated, userController.readById)
router.put('/contacts/:id',isAuthenticated,userController.updateContact)
router.put('/profile',isAuthenticated, userController.update)
=======
router.get('/contacts', isAuthenticated, userController.getContactsEmergency);
router.get('/contacts/:id',isAuthenticated,userController.checkFavorites)

>>>>>>> f12c0c046570c0150a065333275a12be09df2048
module.exports = router;
