const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const newTask = new Task({
    title: req.body.title
  });
  try {
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Could not create task' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.deleteOne(); // Use deleteOne() on the document instance
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;