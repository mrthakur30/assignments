const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const jwt = require('jsonwebtoken');
const jwtPassword = 'asdfg';
const { User, Course } = require('../db/index');
const asyncHandler = require('../asyncHandler');

// User Routes
router.post('/signup', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' });
        return;
    }

    const token = jwt.sign({ username: username }, jwtPassword);

    const user = new User({ username: username, password: password, token: token });
    await user.save();

    res.status(200).send({ token: token });
}));

router.post('/signin', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' });
        return;
    }

    const user = await User.findOne({ username: username });

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({ username: username }, jwtPassword);
            res.send(token);
        } else {
            res.send('Invalid password');
        }
    } else {
        res.send('User not found');
    }
}));

router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.find({});
    res.send(courses);
}));

router.post('/courses/:courseId', userMiddleware, asyncHandler(async (req, res) => {
    const courseId = req.params.courseId;
    const user = await User.findOne({ username: req.header.username });

    if (user) {
        user.courses.push(courseId);
        await user.save();
        res.send({ message: 'Course purchased successfully' });
    } else {
        res.status(404).send({ message: 'User not found' });
    }
}));

router.get('/purchasedCourses', userMiddleware, asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.header.username });

    if (user) {
        res.send(user.courses);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
}));

module.exports = router;
