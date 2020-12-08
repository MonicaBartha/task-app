// Routes for users login
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Login
// endpoint api/auth
router.post('/', 
authController.loginUsers
);

// get the logged in user
router.get('/',
    auth,
    authController.loggedinUser
)

module.exports = router;