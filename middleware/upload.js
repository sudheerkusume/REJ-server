const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    },
});

const fileFilter = (req, file, cb) => {
    // Standardize extensions
    const allowedExtensions = /jpg|jpeg|png|webp|mp4|mov|avi|mkv|pdf|doc|docx/;
    const ext = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );

    // Allowed mimetypes
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    const isDocument = file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (ext && (isImage || isVideo || isDocument)) {
        cb(null, true);
    } else {
        cb(new Error("Only images, videos, and PDF/DOC files are allowed"));
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});
