const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const validateTask = require("../middlewares/validateTask");
const {
    addTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// 📌 Tambah tugas baru
router.post("/", authMiddleware, validateTask, addTask);

// 📌 Ambil semua tugas milik user
router.get("/", authMiddleware, getTasks);

// 📌 Ambil satu tugas berdasarkan ID
router.get("/:id", authMiddleware, getTaskById);

// 📌 Update tugas berdasarkan ID
router.put("/:id", authMiddleware, validateTask, updateTask);

// 📌 Hapus tugas berdasarkan ID
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
