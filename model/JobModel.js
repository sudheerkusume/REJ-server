// const mongoose = require("mongoose");

// const JobSchema = new mongoose.Schema(
//     {
//         companyId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Company",
//             required: true
//         },
//         category: String,
//         image: String,
//         image2: String,
//         title: String,
//         company: String,
//         location: String,
//         location2: String,
//         type: String,
//         experience: String,
//         salary: String,
//         qualification: String,
//         description: String,
//         responsibilities: [String],
//         skills: [String]
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("jobcategories", JobSchema);

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        location: String,
        preferredArea: String,
        salary: {
            min: String,
            max: String,
            commission: String,
        },
        category: String,
        company: String,
        image: String,
        image2: String,
        type: String,
        jobRoleType: String,
        experience: String,
        qualification: [String],
        responsibilities: [String],
        skills: [String],
        benefits: [String],
        languages: [String],
        salesTargets: String,
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

module.exports = mongoose.model("Job", jobSchema);
