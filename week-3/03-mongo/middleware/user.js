const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' })
    }
    const { username, password } = req.headers;

    const user = await User.findOne({ username: username, password: password });

    if (user) {
        next();
    }
    
    res.status(401).send({ message: 'user not found' })
   }

module.exports = userMiddleware;