const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let resourceType = "auto"; // Default to auto to handle images, videos, and raw files (PDFs)

        if (file.mimetype.startsWith("video/")) {
            resourceType = "video";
        } else if (file.mimetype.startsWith("image/")) {
            resourceType = "image";
        }

        return {
            folder: "realestate-projects",
            resource_type: resourceType,
            public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
});

module.exports = upload;
