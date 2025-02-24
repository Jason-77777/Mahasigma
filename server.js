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
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

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

// Jalankan Server
app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));
