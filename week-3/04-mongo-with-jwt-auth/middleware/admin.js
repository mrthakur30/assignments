const { Admin } = require('../db/index');
const jwt = require('jsonwebtoken');

async function adminMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token  = authHeader.substring(7, authHeader.length);
        const {username} = jwt.verify(token, 'asdfg')

        const admin = await Admin.findOne({ username });
        if (admin==null) {
        res.status(401).send({ message: 'user not found' })
        }
        next();
    } catch (error) {
        res.status(500,{ message: error.message});
    }
}

module.exports = adminMiddleware; 