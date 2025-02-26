const Task = require("../models/Task");

/**
 * 📌 Tambah tugas baru
 */
const addTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = new Task({ title, description, completed, userId: req.user.id });
        await task.save();
        res.status(201).json({ message: "Tugas berhasil ditambahkan", task });
    } catch (error) {
        console.error("❌ Error saat menambahkan tugas:", error);
        res.status(500).json({ error: "Gagal menambahkan tugas" });
    }
};

/**
 * 📌 Ambil semua tugas milik user
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
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
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

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
};

/**
 * 📌 Hapus tugas berdasarkan ID
 */
const deleteTask = async (req, res) => {
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
};

module.exports = { addTask, getTasks, getTaskById, updateTask, deleteTask };
