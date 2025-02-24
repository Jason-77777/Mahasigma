const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middlewares/authMiddleware");
const validateTask = require("../middlewares/validateTask");

const router = express.Router();

/**
 * 📌 POST /tasks - Tambah tugas baru
 * Hanya pengguna yang sudah login yang bisa menambah tugas
 */
router.post("/", authMiddleware, validateTask, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = new Task({ title, description, completed, userId: req.user.id });
        await task.save();
        res.status(201).json({ message: "Tugas berhasil ditambahkan", task });
    } catch (error) {
        console.error("❌ Error saat menambahkan tugas:", error);
        res.status(500).json({ error: "Gagal menambahkan tugas" });
    }
});

/**
 * 📌 GET /tasks - Ambil semua tugas milik user
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json({ tasks });
    } catch (error) {
        console.error("❌ Error saat mengambil daftar tugas:", error);
        res.status(500).json({ error: "Gagal mengambil daftar tugas" });
    }
});

/**
 * 📌 GET /tasks/:id - Ambil satu tugas berdasarkan ID
 */
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ error: "Tugas tidak ditemukan" });
        }

        res.json({ task });
    } catch (error) {
        console.error("❌ Error saat mengambil tugas:", error);
        res.status(500).json({ error: "Gagal mengambil tugas" });
    }
});

/**
 * 📌 PUT /tasks/:id - Update tugas berdasarkan ID
 */
router.put("/:id", authMiddleware, validateTask, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: "Tugas tidak ditemukan" });
        }

        res.json({ message: "Tugas berhasil diperbarui", task });
    } catch (error) {
        console.error("❌ Error saat memperbarui tugas:", error);
        res.status(500).json({ error: "Gagal memperbarui tugas" });
    }
});

/**
 * 📌 DELETE /tasks/:id - Hapus tugas berdasarkan ID
 */
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ error: "Tugas tidak ditemukan" });
        }

        res.json({ message: "Tugas berhasil dihapus" });
    } catch (error) {
        console.error("❌ Error saat menghapus tugas:", error);
        res.status(500).json({ error: "Gagal menghapus tugas" });
    }
});

module.exports = router;
