const { Admin } = require('../db/index');

async function adminMiddleware(req, res, next) {
    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' })
    }
    const { username, password } = req.headers;

    const admin = await Admin.findOne({ username: username, password: password });

    if (admin) {
       
        next();
    }
    
    res.status(401).send({ message: 'user not found' })
}

module.exports = adminMiddleware; 