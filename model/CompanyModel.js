const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: String,
        tagline: String,
        industry: String,
        location: String,
        employees: Number,
        website: String,
        logo: String,
        services: [String],
        gallery: [String],
        team: Array,
        chooseUs: Array,
        vision: String,
        mission: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
