const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const jwtPassword = 'asdfg';
const { Admin, Course } = require('../db/index');
const asyncHandler = require('../asyncHandler');

// Admin Routes
router.post('/signup', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' });
        return;
    }

    const token = jwt.sign({ username: username }, jwtPassword);

    const admin = new Admin({ username: username, password: password, token: token });
    await admin.save();

    res.status(200).send({ token: token });
}));

router.post('/signin', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' });
        return;
    }

    const admin = await Admin.findOne({ username: username });

    if (admin) {
        if (admin.password === password) {
            const token = jwt.sign({ username: username }, jwtPassword);
            res.send(token);
        } else {
            res.send("Invalid password");
        }
    } else {
        res.send("User not found");
    }
}));

router.post('/courses', adminMiddleware, asyncHandler(async (req, res) => {
    const { title, description, price, imgLink } = req.body;

    if (!title || !description || !price) {
        res.status(404).send({ message: 'Fields required' });
    }

    const course = new Course({ title, description, price, imgLink });
    await course.save();

    res.status(200).send({ message: 'Course created successfully', courseId: course._id });
}));

router.get('/courses', adminMiddleware, asyncHandler(async (req, res) => {
    const courses = await Course.find({});
    res.status(200).send({ courses });
}));


module.exports = router;
