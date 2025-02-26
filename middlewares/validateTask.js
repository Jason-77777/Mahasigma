const validateTask = (req, res, next) => {
    const { title, category, deadline, status } = req.body;

    if (!title || !category || !deadline || !status) {
        return res.status(400).json({ error: "Semua field (title, category, deadline, status) harus diisi!" });
    }

    if (typeof title !== "string" || typeof category !== "string" || typeof status !== "string") {
        return res.status(400).json({ error: "Title, category, dan status harus berupa string!" });
    }

    if (isNaN(Date.parse(deadline))) {
        return res.status(400).json({ error: "Deadline harus berupa tanggal yang valid!" });
    }

    const validStatus = ["Belum Selesai", "Selesai"];
    if (!validStatus.includes(status)) {
        return res.status(400).json({ error: "Status harus 'Belum Selesai' atau 'Selesai'!" });
    }

    next();
};

module.exports = validateTask;

