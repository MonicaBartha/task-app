const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    // checking for errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // get email and password
    const {email, password} = req.body;
    try {
        // check for unique user (cannot be 2 users with the same email)
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'User already exists.'});
        }

        // create new user
        user = new User(req.body);

        // hash the password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // save user
        await user.save();

        // Create and sign the JsonWebToken
        const payload = {
            user: {
                id: user.id
            }
        };
        // sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 7200 // two hours 
        }, (error, token) => {
            if(error) throw error;
            // confirmation message
            res.json({ token });
            
        });

       
    } catch (error) {
        console.log(error);
        res.status(400).send('Error was found');
    }
}