//connect database error atau tidak
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB terkoneksi");
    } catch (error) {
        console.error("❌ Koneksi MongoDB gagal:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
