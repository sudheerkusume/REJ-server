const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "recruiter",
        },
        permissions: {
            postJobs: { type: Boolean, default: false },
            viewApplications: { type: Boolean, default: false },
            manageJobs: { type: Boolean, default: false },
            manageRecruiters: { type: Boolean, default: false },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recruiter", RecruiterSchema);
