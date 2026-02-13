const express = require("express");
const router = express.Router();
const recruiterAuth = require("../middleware/recruiterAuth");
const Job = require("../model/JobModel");
const JobApplication = require("../model/JobApplicationModel");
/* ================= POST JOB ================= */

router.post("/jobs", recruiterAuth, async (req, res) => {
    const job = new Job({ ...req.body, recruiterId: req.recruiterId });
    await job.save();
    res.status(201).json(job);
});

router.post("/add-job", recruiterAuth, async (req, res) => {
    const job = new JobCategory({
        ...req.body,
        recruiterId: req.recruiterId, // recruiter owns job
        createdBy: req.recruiterId,
        creatorRole: "recruiter"
    });

    await job.save();
    res.json({ message: "Job added by recruiter" });
});


router.get("/jobs", recruiterAuth, async (req, res) => {
    const jobs = await Job.find({ recruiterId: req.recruiterId });
    res.json(jobs);
});

router.get("/applications", recruiterAuth, async (req, res) => {
    try {
        const applications = await JobApplication.find()
            .populate({
                path: "jobId",
                match: { recruiterId: req.recruiterId },
                select: "title location"
            })
            .populate("userId", "name email");

        // 🔥 FILTER NULL JOBS (VERY IMPORTANT)
        const filtered = applications.filter(app => app.jobId);

        res.json(filtered);

    } catch (err) {
        console.error("Recruiter applications error:", err);
        res.status(500).json({ message: "Failed to load applications" });
    }
});

router.put("/application-status/:id", recruiterAuth, async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id)
            .populate("jobId");

        if (!application || !application.jobId) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.jobId.recruiterId.toString() !== req.recruiterId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        application.status = req.body.status;
        await application.save();

        res.json(application);
    } catch (err) {
        console.error("Status update error:", err);
        res.status(500).json({ message: "Failed to update status" });
    }
});

router.get("/dashboard-stats", recruiterAuth, async (req, res) => {
    const jobs = await Job.find({ recruiterId: req.recruiterId });
    const jobIds = jobs.map(j => j._id);

    const total = await JobApplication.countDocuments({ jobId: { $in: jobIds } });
    const shortlisted = await JobApplication.countDocuments({ jobId: { $in: jobIds }, status: "Shortlisted" });
    const selected = await JobApplication.countDocuments({ jobId: { $in: jobIds }, status: "Selected" });
    const rejected = await JobApplication.countDocuments({ jobId: { $in: jobIds }, status: "Rejected" });

    res.json({ total, shortlisted, selected, rejected });
});

/* ================= MY JOBS ================= */
// router.get("/recruiter/jobs", recruiterAuth, async (req, res) => {
//     const jobs = await Job.find({ recruiterId: req.recruiterId });
//     res.json(jobs);
// });

module.exports = router;
