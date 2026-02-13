const express = require("express");
const router = express.Router();
const recruiterAuth = require("../middleware/recruiterAuth");
const User = require("../model/UserModel");

router.get("/candidate/:id", recruiterAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching candidate:", err);
        res.status(500).json({ message: "Failed to load candidate" });
    }
});

module.exports = router;
