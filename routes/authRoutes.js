const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { nama, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ nama, email, password: hashedPassword });
        await user.save();
        res.json({ message: "Registrasi berhasil" });
    } catch (error) {
        res.status(400).json({ error: "Gagal registrasi" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Pengguna tidak ditemukan" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Password salah" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "rahasia", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Gagal login" });
    }
});

module.exports = router;
