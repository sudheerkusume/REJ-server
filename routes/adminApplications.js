const express = require("express");
const router = express.Router();
const JobApplication = require("../model/JobApplicationModel");
const adminAuth = require("../middleware/adminAuth");

/* ================= GET ALL APPLICATIONS ================= */
router.get("/admin/applications", adminAuth, async (req, res) => {
    try {
        const applications = await JobApplication.find({ companyId: req.userId })
            .populate("userId", "name email")
            .populate("companyId", "name")
            .populate({
                path: "jobId",
                populate: {
                    path: "recruiterId",
                    select: "name email"
                }
            });
        res.json(applications);
    } catch (err) {
        console.error("Admin applications error:", err);
        res.status(500).json({ message: "Failed to fetch applications" });
    }
});

/* ================= UPDATE APPLICATION STATUS ================= */
router.put("/admin/application-status/:id", adminAuth, async (req, res) => {
    try {
        const { status } = req.body;

        const updated = await JobApplication.findOneAndUpdate(
            { _id: req.params.id, companyId: req.userId },
            { status },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Application not found" });
        res.json(updated);
    } catch (err) {
        console.error("Update status error:", err);
        res.status(500).json({ message: "Failed to update status" });
    }
});

module.exports = router;
