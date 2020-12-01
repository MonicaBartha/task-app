// Routes for users login
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');


// endpoint api/auth
router.post('/', 
[
    check('email', 'Add a valid email').isEmail(),
    check('password', 'Password must have minimum 6 characters').isLength({min: 6})
],
authController.loginUsers
);

module.exports = router;