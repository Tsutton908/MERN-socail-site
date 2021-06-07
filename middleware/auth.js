const jwt = require('jsonwebtoken');
const config = require('config');

//middleware validates the token return by the user
module.exports = function(req, res, next) {
    // Get the token from the header
    const token = req.header('x-auth-token');

    // Check if there is no token
    if(!token) {
        return res.status(401).json({ msg: 'No Token, authorizaton denied' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}