const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    title: String,
    subtitle: String,
    description: String,

    price: String,
    completion: String,
    paymentPlan: String,
    apartments: String,
    bedrooms: String,

    location: String,
    locationDescription: String,

    heroVideo: String,
    brochure: String,

    backgroundImages: [String],

    amenitiesBackground: String,
    amenitiesGallery: [String],
    amenities: [String],

    gallery: [String],

    mapEmbedLink: String,

    connectivity: [
        {
            label: String,
            value: String,
            iconType: String
        }
    ],

    faqs: [
        {
            question: String,
            answer: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
