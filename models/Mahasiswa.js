//NOT NEEDED
const mongoose = require("mongoose");

const MahasiswaSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nim: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jurusan: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Mahasiswa", MahasiswaSchema);
