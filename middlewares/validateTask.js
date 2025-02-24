const validateTask = (req, res, next) => {
    const { title, description, completed } = req.body;

    if (!title || !description || completed === undefined) {
        return res.status(400).json({ error: "Semua field (title, description, completed) harus diisi!" });
    }

    if (typeof title !== "string" || typeof description !== "string") {
        return res.status(400).json({ error: "Title dan description harus berupa string!" });
    }

    if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed harus berupa boolean (true/false)!" });
    }

    next();
};

module.exports = validateTask;
