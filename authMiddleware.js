
// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied: No Token Provided!');

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token');
    }
};
