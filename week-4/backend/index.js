const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const z = require('zod');

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/todoss');

const todoSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    title: String,
    description: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

const todoParser = z.object({
    title: z.string(),
    description: z.string()
});

// Middlewares
app.use(express.json());

// Routes
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/create', async (req, res) => {
    try {
        const todo = todoParser.parse(req.body);
        if (!todo) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const newTodo = new Todo({
            title: todo.title,
            description: todo.description,
            completed: false
        });

        await newTodo.save();

        res.status(200).json({ message: 'Todo created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/delete', async (req, res) => {
    try {
        const todoId = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
            completed: true
        });

        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
