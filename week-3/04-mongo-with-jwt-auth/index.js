const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

const mongoose = require('mongoose');

// Connect to MongoDB
try {
    mongoose.connect('mongodb://localhost:27017/udemy');
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
