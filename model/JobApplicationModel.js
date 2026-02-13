const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",          // ✅ must match User model name
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",  // ✅ MUST MATCH JobCategory model
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",      // ✅ MUST MATCH Company model
        required: true
    },
    status: {
        type: String,
        default: "Applied"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter"
    }
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
