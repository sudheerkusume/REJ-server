const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        company: String,
        description: String,
        location: String, // City
        preferredArea: String, // Local area (Single selection)
        salary: {

            min: String,
            max: String,
            commission: String,

        },
        category: String,
        type: String, // Full-time / Part-time
        jobRoleType: String, // Office / Hybrid etc
        experience: String,
        qualification: [String],

        image: String, // Category Icon
        image2: String, // Banner
        responsibilities: [String],
        skills: [String],
        salesTargets: String,
        benefits: [String],
        languages: [String],
        propertyTypes: [String],

        // 🔑 IMPORTANT
        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recruiter"
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        }
    },
    { timestamps: true }
);

// Prevent model overwrite error
module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
