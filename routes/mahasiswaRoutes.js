//NOT NEEDED
const express = require("express");
const { tambahMahasiswa, getMahasiswa } = require("../controllers/mahasiswaController");
const router = express.Router();

router.post("/mahasiswa", tambahMahasiswa);
router.get("/mahasiswa", getMahasiswa);

module.exports = router;
