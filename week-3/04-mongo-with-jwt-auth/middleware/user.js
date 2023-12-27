const { User } = require('../db/index');
const jwt = require('jsonwebtoken');

async function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.substring(7, authHeader.length);
        const { username } = jwt.verify(token, 'asdfg')

        const user = await User.findOne({ username });

        if (user == null) {
            res.status(401).send({ message: 'user not found' })
        }
        next();

        res.status(401).send({ message: 'user not found' })
    } catch (error) {
        res.status(500, { message: error.message });
    }
}

module.exports = userMiddleware;