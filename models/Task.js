const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TaskSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true }, // 🔹 Auto-generate UUID
    title: { type: String, required: true },
    category: { type: String, required: true },
    deadline: { type: String, required: true }, // Format: YYYY-MM-DD
    status: { type: String, enum: ["Belum Selesai", "Selesai"], default: "Belum Selesai" }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);