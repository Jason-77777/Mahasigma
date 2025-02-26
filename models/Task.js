const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // 🟢 ID dalam format string
    title: { type: String, required: true },
    category: { type: String, required: true },
    deadline: { type: String, required: true }, // 🟢 Deadline dalam format string (YYYY-MM-DD)
    status: { type: String, enum: ["Belum Selesai", "Selesai"], default: "Belum Selesai" } // 🟢 Status hanya bisa "Belum Selesai" atau "Selesai"
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);