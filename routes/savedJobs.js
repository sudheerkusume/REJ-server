const express = require("express");
const router = express.Router();
const SavedJob = require("../model/SaveJobModel"); // or SavedJobModel (match filename)
const userAuth = require("../middleware/userAuth");

/* ================= SAVE JOB ================= */
router.post("/saved-jobs", userAuth, async (req, res) => {
    try {
        const { jobId } = req.body;

        const saved = await SavedJob.create({
            userId: req.userId,
            jobId,
        });

        res.status(201).json(saved);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Job already saved" });
        }
        res.status(500).json({ message: "Failed to save job" });
    }
});

/* ================= GET SAVED JOBS ================= */
router.get("/saved-jobs", userAuth, async (req, res) => {
    const jobs = await SavedJob.find({ userId: req.userId })
        .populate("jobId");

    res.json(jobs);
});

/* ================= REMOVE SAVED JOB ================= */
router.delete("/saved-jobs/:id", userAuth, async (req, res) => {
    await SavedJob.deleteOne({
        _id: req.params.id,
        userId: req.userId,
    });

    res.json({ message: "Saved job removed" });
});

module.exports = router;
