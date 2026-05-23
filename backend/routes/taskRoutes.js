const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTaskStatus);

router.put("/edit/:id", protect, editTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;