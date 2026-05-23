const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    // Only Admin can create tasks
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can create tasks",
      });
    }
const {
  title,
  description,
  project,
  assignedTo,
  dueDate,
  status,
  priority,
} = req.body;

    if (
      !title ||
      !description ||
      !project ||
      !assignedTo
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      status,
      priority,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getTasks = async (req, res) => {
  try {

    let tasks;

    // Admin sees all tasks
    if (req.user.role === "Admin") {

      tasks = await Task.find()
        .populate("project", "title")
        .populate("assignedTo", "name email role");

    } else {

      // Member sees only assigned tasks
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
        .populate("project", "title")
        .populate("assignedTo", "name email role");
    }

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Member can update only assigned task
    if (
      req.user.role === "Member" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task Status Updated",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.editTask = async (req, res) => {
  try {

    // Only Admin can edit tasks
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can edit tasks",
      });
    }

    const {
      title,
      description,
      status,
      dueDate,
    } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        dueDate,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Task Edited Successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.deleteTask = async (req, res) => {
  try {

    // Only Admin can delete tasks
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can delete tasks",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};