// Entry point
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/MahasiswaDB";

// Middleware
app.set("view engine", "ejs"); // Gunakan EJS
app.use(express.static("public")); // Gunakan folder "public" untuk file statis (CSS, JS, dll.)
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// Route untuk halaman utama
app.get("/", (req, res) => {
    res.render("index", { title: "Dashboard Mahasigma", message: "Selamat datang di Mahasigma!" });
});

// Koneksi ke MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ MongoDB terkoneksi");
    } catch (error) {
        console.error("❌ Koneksi MongoDB gagal:", error.message);
        process.exit(1);
    }
};
connectDB();

// Halaman utama
app.get("/", (req, res) => {
    res.render("index", { 
        title: "Dashboard Mahasigma", 
        message: "Selamat datang di Mahasigma!",
        error: null // Tambahkan error agar tidak undefined
    });
});


// Halaman register
app.get("/register", (req, res) => {
    res.render("register", { error: null });
});

// Halaman dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Jalankan Server
app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));
