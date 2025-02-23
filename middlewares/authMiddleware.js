const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Akses ditolak, token diperlukan" });

    try {
        const verified = jwt.verify(token.split(" ")[1], "rahasia"); // Ambil token setelah "Bearer "
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token tidak valid" });
    }
};

module.exports = authMiddleware;
