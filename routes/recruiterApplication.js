const express = require("express");
const router = express.Router();
const recruiterAuth = require("../middleware/recruiterAuth");
const JobApplication = require("../model/JobApplicationModel");

router.put("/application/:id/rating", recruiterAuth, async (req, res) => {
    try {
        const { rating } = req.body;

        await JobApplication.findByIdAndUpdate(req.params.id, {
            rating
        });

        res.json({ message: "Rating updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update rating" });
    }
});


module.exports = router;
