require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/MahasiswaDB";
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/users", userRoutes); //
app.use(cors());

// Koneksi ke MongoDB
try {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("✅ MongoDB terkoneksi");
} catch (error) {
    console.error("❌ Koneksi MongoDB gagal:", error);
    process.exit(1);
}

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Akses ditolak, token diperlukan" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "rahasia");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token tidak valid" });
    }
};

const UserSchema = new mongoose.Schema({
    nama: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model("User", UserSchema);

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    userId: mongoose.Schema.Types.ObjectId,
});
const Task = mongoose.model("Task", TaskSchema);

app.post("/auth/register", async (req, res) => {
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

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", email); // Cek email masuk

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found!");
            return res.status(400).json({ error: "Pengguna tidak ditemukan" });
        }

        console.log("User found:", user);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Password check:", validPassword);

        if (!validPassword) {
            console.log("Incorrect password");
            return res.status(400).json({ error: "Password salah" });
        }

        const token = jwt.sign({ id: user._id }, "rahasia", { expiresIn: "1h" });
        console.log("Login successful, token generated");

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Gagal login" });
    }
});


app.post("/tasks", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, userId: req.user.id });
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Gagal menambahkan tugas" });
    }
});

app.get("/tasks", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil daftar tugas" });
    }
});

app.put("/tasks/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui tugas" });
    }
});

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: "Tugas berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus tugas" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));
