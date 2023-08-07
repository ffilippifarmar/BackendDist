const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/index');


router.post("/contacts", isAuthenticated, userController.addContactEmergency);
router.delete("/contacts", isAuthenticated, userController.removeContactEmergency);
router.get('/contacts', isAuthenticated, userController.getContactsEmergency);
router.get('/profile',isAuthenticated, userController.readById)
router.put('/contacts/:id',isAuthenticated,userController.updateContact)
router.put('/profile',isAuthenticated, userController.update)
module.exports = router;
