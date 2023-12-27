const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin , Course} =  require('../db/index');


// Admin Routes
app.post('/signup', async (req, res) => {
    const {username , password} = req.body ;

    if(!username || !password){
        res.status(401).send({message: 'username or password is required'})
    }
    const admin = new Admin({username, password});
    await admin.save();
    res.status(200).send({ message: 'Admin created successfully' });
});

app.post('/courses', adminMiddleware,async (req, res) => {

    const {title, description, price, imgLink} = req.body ;
    if(!title || !description || !price ){
        res.status(404).send({ message: 'Fields required'})
    }
    const course = new Course(title, description, price, imgLink);
    
    await course.save();

    res.status(200).send({ message: 'Course created successfully', courseId: course._id });
});

app.get('/courses', adminMiddleware, async (req, res) => {
     const courses = await Course.findAll();
     res.status(200).send({ courses : courses });
});

module.exports = router;
