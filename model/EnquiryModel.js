const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    message: String
})

module.exports = mongoose.model("Enquiry", EnquirySchema)
