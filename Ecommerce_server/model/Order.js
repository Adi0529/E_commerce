const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                vendor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                productName: String,

                thumbnail: String,

                price: Number,

                quantity: Number,

                subtotal: Number,

                orderStatus: {
                    type: String,
                    enum: [
                        "Pending",
                        "Confirmed",
                        "Packed",
                        "Shipped",
                        "Out For Delivery",
                        "Delivered",
                        "Cancelled"
                    ],
                    default: "Pending"
                }
            }
        ],

        shippingAddress: {
            fullName: String,
            mobile: String,
            address: String,
            city: String,
            state: String,
            country: String,
            pincode: String
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "Razorpay", "Stripe"],
            default: "COD"
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending"
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Packed",
                "Shipped",
                "Out For Delivery",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        totalAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);