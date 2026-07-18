const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productName: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
        },

        discountPrice: {
            type: Number,
            default: 0,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        specifications: {
            type: Map,
            of: String,
            default: {},
        },

        rating: {
            type: Number,
            default: 0,
        },

        totalReviews: {
            type: Number,
            default: 0,
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

module.exports = mongoose.model("Product", productSchema);