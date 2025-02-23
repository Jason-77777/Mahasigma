const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, userId: req.user.id });
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Gagal menambahkan tugas" });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil daftar tugas" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui tugas" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: "Tugas berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus tugas" });
    }
});

module.exports = router;
