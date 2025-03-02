//NOT NEEDED
const Mahasiswa = require("../models/Mahasiswa");

// Menambahkan data mahasiswa
const tambahMahasiswa = async (req, res) => {
    try {
        const { nama, nim, email, jurusan } = req.body;
        const mahasiswaBaru = new Mahasiswa({ nama, nim, email, jurusan });
        await mahasiswaBaru.save();
        res.status(201).json({ message: "Mahasiswa berhasil ditambahkan!", data: mahasiswaBaru });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mendapatkan semua mahasiswa
const getMahasiswa = async (req, res) => {
    try {
        const mahasiswas = await Mahasiswa.find();
        res.status(200).json(mahasiswas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { tambahMahasiswa, getMahasiswa };
