const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userControllers');

router.post('/addUser', userController.addUser);
router.post('/userLogin', userController.loginUser);


module.exports = router;