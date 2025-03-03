//authentication JWT agar bisa masuk kedalam task
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("🟠 Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: "Akses ditolak, token diperlukan" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ error: "Format token salah" });
    }

    const token = parts[1];
//handle error
    try {
        //nama token rahasia
        const verified = jwt.verify(token, process.env.JWT_SECRET || "rahasia");
        console.log("✅ Verified Token:", verified);
        req.user = verified;
        next();
    } catch (error) {
        console.error("❌ Token Error:", error.message);
        res.status(400).json({ error: "Token tidak valid" });
    }
};

module.exports = authMiddleware;
