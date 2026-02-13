const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            enum: ["Online", "Offline", "Hybrid"],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            required: true
        },
        skillsCovered: [
            {
                type: String
            }
        ],
        certificationProvider: {
            type: String,
            required: true
        },
        jobRoles: [
            {
                type: String
            }
        ],
        image: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Certification", CertificationSchema);
