const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin , Course} =  require('../db/index');


// Admin Routes
<<<<<<< HEAD
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
=======
router.post('/signup', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
>>>>>>> 44221a6567c34bcb8321268b6c0180e2a2a48d63
});

module.exports = router;
