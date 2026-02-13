const express = require("express");
const router = express.Router();

const JobApplication = require("../model/JobApplicationModel");
const sendMail = require("../mailer");
const { applicationStatusTemplate } = require("../emailTemplates");

const recruiterAuth = require("../middleware/recruiterAuth");
const adminAuth = require("../middleware/adminAuth");

/* ================= ADMIN ================= */
router.put("/admin/application-status/:id", adminAuth, async (req, res) => {
    try {
        const { status } = req.body;

        const application = await JobApplication.findById(req.params.id)
            .populate("userId", "name email")
            .populate("jobId", "title");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;
        await application.save();

        if (["Shortlisted", "Rejected"].includes(status)) {
            await sendMail({
                to: application.userId.email,
                subject:
                    status === "Shortlisted"
                        ? "🎉 You’ve Been Shortlisted!"
                        : "❌ Application Update",
                html: applicationStatusTemplate({
                    name: application.userId.name,
                    jobTitle: application.jobId.title,
                    status,
                }),
            });
        }

        res.json({
            message: "Status updated & email sent successfully",
            application,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ================= RECRUITER ================= */
router.put("/recruiter/application-status/:id", recruiterAuth, async (req, res) => {
    try {
        const { status } = req.body;

        const application = await JobApplication.findById(req.params.id)
            .populate("userId", "name email")
            .populate("jobId", "title");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;
        await application.save();

        if (["Shortlisted", "Rejected"].includes(status)) {
            await sendMail({
                to: application.userId.email,
                subject:
                    status === "Shortlisted"
                        ? "🎉 You’ve Been Shortlisted!"
                        : "❌ Application Update",
                html: applicationStatusTemplate({
                    name: application.userId.name,
                    jobTitle: application.jobId.title,
                    status,
                }),
            });
        }

        res.json({
            message: "Status updated & email sent successfully",
            application,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
