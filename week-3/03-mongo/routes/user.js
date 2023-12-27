const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index');

// User Routes
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).send({ message: 'username or password is required' })
    }
    new User({ username, password },(user)=>{
        user.save();
        res.status(200).send({ message: 'User created successfully' });
    });
});

app.get('/courses', (req, res) => {
    Course.find({}, (courses) => {
        res.send(courses);
    })
});

app.post('/courses/:courseId', userMiddleware, (req, res) => {
    const courseId = req.params.courseId;
    User.find({ username: req.header.username }, (user) => {
        user.courses.push(courseId);
        user.save();
        res.send({ message: 'Course purchased successfully' })
    });
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {
    User.find({ username: req.header.username }, (user) => {
        res.send(user.courses);
    });
});

module.exports = router;