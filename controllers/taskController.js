// API sederhana untuk melakukan crud 
const { v4: uuidv4 } = require("uuid");
const Task = require("../models/Task");

/**
 * 📌 Tambah tugas baru
 */
const addTask = async (req, res) => {
    try {
        const { title, category, deadline, status } = req.body;

        const task = new Task({
            id: uuidv4(), // 🟢 Auto-generate ID
            title,
            category,
            deadline,
            status: status || "Belum Selesai" // Default "Belum Selesai"
        });

        await task.save();
        res.status(201).json({ message: "Tugas berhasil ditambahkan", task });
    } catch (error) {
        console.error("❌ Error saat menambahkan tugas:", error);
        res.status(500).json({ error: "Gagal menambahkan tugas" });
    }
};

/**
 * 📌 Ambil semua tugas
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ tasks });
    } catch (error) {
        console.error("❌ Error saat mengambil daftar tugas:", error);
        res.status(500).json({ error: "Gagal mengambil daftar tugas" });
    }
};

/**
 * 📌 Ambil satu tugas berdasarkan ID
 */
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });

        if (!task) {
            return res.status(404).json({ error: "Tugas tidak ditemukan" });
        }

        res.json({ task });
    } catch (error) {
        console.error("❌ Error saat mengambil tugas:", error);
        res.status(500).json({ error: "Gagal mengambil tugas" });
    }
};

/**
 * 📌 Update tugas berdasarkan ID
 */
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });

        if (!task) {
            return res.status(404).json({ error: "Tugas tidak ditemukan" });
        }

        // ✅ Update hanya jika field dikirim
        if (req.body.title) task.title = req.body.title;
        if (req.body.category) task.category = req.body.category;
        if (req.body.deadline) task.deadline = req.body.deadline;
        if (req.body.status) task.status = req.body.status; // Status bisa diubah

        await task.save();
        res.json({ message: "Tugas berhasil diperbarui", task });
    } catch (error) {
        console.error("❌ Error saat memperbarui tugas:", error);
        res.status(500).json({ error: "Gagal memperbarui tugas" });
    }
};

/**
 * 📌 Hapus tugas berdasarkan ID
 */
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });

        if (!task) {
            return res.status(404).json({ error: "Tugas tidak ditemukan" });
        }

        await Task.deleteOne({ id: req.params.id });
        res.json({ message: "Tugas berhasil dihapus" });
    } catch (error) {
        console.error("❌ Error saat menghapus tugas:", error);
        res.status(500).json({ error: "Gagal menghapus tugas" });
    }
};

module.exports = { addTask, getTasks, getTaskById, updateTask, deleteTask };
