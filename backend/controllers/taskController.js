const Task = require('../models/Task');

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    // validation
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = await Task.create({
      title,
      user: req.user.id
    });

    // Populate user data before sending response
    const populatedTask = await Task.findById(task._id).populate('user', 'name email');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    // if admin → get all tasks
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('user', 'name email');
    } 
    // normal user → only own tasks
    else {
      tasks = await Task.find({ user: req.user.id }).populate('user', 'name email');
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // check if task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // check if task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // allow admin OR owner
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};