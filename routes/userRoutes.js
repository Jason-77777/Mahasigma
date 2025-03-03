//NOT NEEDED
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

// ✅ Endpoint untuk mendapatkan profil pengguna
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

module.exports = router;
