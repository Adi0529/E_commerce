const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        brandName: {
            type: String,
            required: true,
            trim: true,
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brandLogo: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Brand", brandSchema);