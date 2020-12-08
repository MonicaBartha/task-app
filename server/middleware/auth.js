const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read token from header
    const token = req.header('x-auth-token');

    // Check if is no token
    if( !token ) {
        return res.status(401).json({msg: 'No Token. You need a token'})
    }
    // Token validation
    try {
        const verifyToken = jwt.verify(token, process.env.SECRET);
        req.user = verifyToken.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid Token'});
    }
}