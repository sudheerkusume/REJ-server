const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let resourceType = "image";

        if (file.mimetype.startsWith("video/")) {
            resourceType = "video";
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
