// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const JobApplication = require("../model/JobApplicationModel");
// const userAuth = require("../middleware/userAuth");

// /* ================= APPLY JOB ================= */
// router.post("/apply-job", userAuth, async (req, res) => {
//     try {
//         const { jobId, companyId } = req.body;
//         const userId = req.userId;

//         if (!jobId || !companyId) {
//             return res.status(400).json({ message: "JobId & CompanyId required" });
//         }

//         const alreadyApplied = await JobApplication.findOne({
//             userId,
//             jobId
//         });

//         if (alreadyApplied) {
//             return res.status(400).json({
//                 message: "You have already applied for this job"
//             });
//         }

//         const application = new JobApplication({
//             userId: new mongoose.Types.ObjectId(userId),
//             jobId: new mongoose.Types.ObjectId(jobId),
//             companyId: new mongoose.Types.ObjectId(companyId)
//         });

//         await application.save();

//         res.json({ message: "Job applied successfully" });
//     } catch (err) {
//         console.error("Apply job error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const JobApplication = require("../model/JobApplicationModel");

router.post("/apply-job", userAuth, async (req, res) => {
    try {
        const { jobId, companyId } = req.body;

        if (!jobId || !companyId) {
            return res.status(400).json({ message: "Missing jobId or companyId" });
        }

        const exists = await JobApplication.findOne({
            jobId,
            userId: req.userId
        });

        if (exists) {
            return res.status(400).json({ message: "Already applied" });
        }

        const application = new JobApplication({
            jobId,
            companyId,
            userId: req.userId,
            status: "Applied"
        });

        await application.save();

        res.json({ message: "Applied successfully" });
    } catch (err) {
        console.error("Apply Job Error:", err);
        res.status(500).json({ message: "Apply failed" });
    }
});

module.exports = router;
