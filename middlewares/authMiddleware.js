const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("Authorization Header:", authHeader); // Debugging

    if (!authHeader) {
        return res.status(401).json({ error: "Akses ditolak, token diperlukan" });
    }

    // Memastikan format token "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ error: "Format token salah" });
    }

    const token = parts[1];
    console.log("Extracted Token:", token); // Debugging

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "rahasia");
        console.log("Verified Token:", verified); // Debugging
        req.user = verified;
        next();
    } catch (error) {
        console.log("Token Error:", error.message);
        res.status(400).json({ error: "Token tidak valid" });
    }
};

module.exports = authMiddleware;
