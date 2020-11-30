// Routes for create users 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create a user
// endpoint api/users
router.post('/', 
    userController.createUser 
);

module.exports = router;