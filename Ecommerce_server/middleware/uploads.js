const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (file.fieldname === "profileImage") {
            cb(null, "uploads/users");
        }

        else if (file.fieldname === "thumbnail") {
            cb(null, "uploads/products/thumbnails");
        }

        else if (file.fieldname === "images") {
            cb(null, "uploads/products/images");
        }

        else {
            cb(new Error("Invalid field name"));
        }

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    }

    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));

};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }

});

module.exports = upload;