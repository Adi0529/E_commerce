const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        mobile: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/,
        },

        profileImage: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["Admin", "Vendor", "User"],
            default: "User",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        address: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            default: "",
        },

        pincode: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);