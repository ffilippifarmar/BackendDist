const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/index');


router.post("/contacts", isAuthenticated, userController.addContactEmergency);
router.get('/contacts', isAuthenticated, userController.getContactsEmergency);
router.get('/contacts/:id',isAuthenticated,userController.checkFavorites)

module.exports = router;
