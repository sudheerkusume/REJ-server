const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "../uploads/profile");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}