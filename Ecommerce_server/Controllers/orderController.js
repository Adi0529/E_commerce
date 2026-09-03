const Order = require("../model/Order");
const Cart = require("../model/Cart");
const Product = require("../model/Product");



// ============================================
// Place Order
// ============================================

const placeOrder = async (req, res) => {

    try {

        const { shippingAddress, paymentMethod } = req.body;

        if (!shippingAddress) {

            return res.status(400).send({
                success: false,
                msg: "Shipping address is required"
            });

        }

        const cartItems = await Cart.find({

            user: req.user.id

        }).populate("product");

        if (cartItems.length === 0) {

            return res.status(400).send({

                success: false,

                msg: "Cart is empty"

            });

        }

        let orderItems = [];

        let totalAmount = 0;

        for (const item of cartItems) {

            const product = item.product;

            if (!product) {

                return res.status(404).send({

                    success: false,

                    msg: "Product not found"

                });

            }

            if (!product.isActive) {

                return res.status(400).send({

                    success: false,

                    msg: `${product.productName} is unavailable`

                });

            }

            if (product.stock < item.quantity) {

                return res.status(400).send({

                    success: false,

                    msg: `${product.productName} has only ${product.stock} items left`

                });

            }

            const sellingPrice =
                product.discountPrice > 0
                    ? product.discountPrice
                    : product.price;

            orderItems.push({

                product: product._id,

                vendor: product.vendor,

                productName: product.productName,

                thumbnail: product.thumbnail,

                price: sellingPrice,

                quantity: item.quantity,

                subtotal: sellingPrice * item.quantity

            });

            totalAmount += sellingPrice * item.quantity;

        }

        const order = await Order.create({

            user: req.user.id,

            items: orderItems,

            shippingAddress,

            paymentMethod,

            totalAmount

        });

        // Reduce Stock

        for (const item of cartItems) {

            await Product.findByIdAndUpdate(

                item.product._id,

                {

                    $inc: {

                        stock: -item.quantity

                    }

                }

            );

        }

        // Clear Cart

        await Cart.deleteMany({

            user: req.user.id

        });

        return res.status(201).send({

            success: true,

            msg: "Order placed successfully",

            order

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while placing order"

        });

    }

};



// ============================================
// Get My Orders
// ============================================

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id

        })
            .sort({

                createdAt: -1

            });

        return res.status(200).send({

            success: true,

            totalOrders: orders.length,

            orders

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching orders"

        });

    }

};



// ============================================
// Get Single Order
// ============================================

const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("user", "name email mobile");

        if (!order) {

            return res.status(404).send({

                success: false,

                msg: "Order not found"

            });

        }

        if (order.user._id.toString() !== req.user.id) {

            return res.status(403).send({

                success: false,

                msg: "Unauthorized"

            });

        }

        return res.status(200).send({

            success: true,

            order

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching order"

        });

    }

};
// ============================================
// Cancel Order (User)
// ============================================

const cancelOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).send({
                success: false,
                msg: "Order not found"
            });

        }

        if (order.user.toString() !== req.user.id) {

            return res.status(403).send({
                success: false,
                msg: "Unauthorized"
            });

        }

        if (
            order.orderStatus === "Shipped" ||
            order.orderStatus === "Out For Delivery" ||
            order.orderStatus === "Delivered"
        ) {

            return res.status(400).send({
                success: false,
                msg: "Order cannot be cancelled"
            });

        }

        if (order.orderStatus === "Cancelled") {

            return res.status(400).send({
                success: false,
                msg: "Order already cancelled"
            });

        }

        order.orderStatus = "Cancelled";

        await order.save();

        // Restore Product Stock

        for (const item of order.items) {

            await Product.findByIdAndUpdate(

                item.product,

                {

                    $inc: {

                        stock: item.quantity

                    }

                }

            );

        }

        return res.status(200).send({

            success: true,

            msg: "Order cancelled successfully",

            order

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while cancelling order"

        });

    }

};



// ============================================
// Vendor Orders
// ============================================

const getVendorOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            "items.vendor": req.user.id

        })
            .populate("user", "name email mobile")
            .sort({ createdAt: -1 });

        const vendorOrders = [];

        orders.forEach(order => {

            const myItems = order.items.filter(item =>

                item.vendor.toString() === req.user.id

            );

            vendorOrders.push({

                _id: order._id,

                customer: order.user,

                shippingAddress: order.shippingAddress,

                paymentMethod: order.paymentMethod,

                paymentStatus: order.paymentStatus,

                orderStatus: order.orderStatus,

                createdAt: order.createdAt,

                items: myItems

            });

        });

        return res.status(200).send({

            success: true,

            totalOrders: vendorOrders.length,

            orders: vendorOrders

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching vendor orders"

        });

    }

};



// ============================================
// Vendor Update Order Status
// ============================================

const updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const allowedStatus = [

            "Confirmed",

            "Packed",

            "Shipped",

            "Out For Delivery",

            "Delivered"

        ];

        if (!allowedStatus.includes(orderStatus)) {

            return res.status(400).send({

                success: false,

                msg: "Invalid order status"

            });

        }

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).send({

                success: false,

                msg: "Order not found"

            });

        }

        const vendorExists = order.items.some(

            item => item.vendor.toString() === req.user.id

        );

        if (!vendorExists) {

            return res.status(403).send({

                success: false,

                msg: "Unauthorized"

            });

        }

        if (order.orderStatus === "Cancelled") {

            return res.status(400).send({

                success: false,

                msg: "Cancelled order cannot be updated"

            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        return res.status(200).send({

            success: true,

            msg: "Order status updated successfully",

            order

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while updating order status"

        });

    }

};

// ============================================
// Get All Orders
// ============================================

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email mobile")
            .sort({ createdAt: -1 });

        return res.status(200).send({

            success: true,

            totalOrders: orders.length,

            orders

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching orders"

        });

    }

};



// ============================================
// Admin Get Order
// ============================================

const adminGetOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("user", "name email mobile");

        if (!order) {

            return res.status(404).send({

                success: false,

                msg: "Order not found"

            });

        }

        return res.status(200).send({

            success: true,

            order

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching order"

        });

    }

};



// ============================================
// Admin Update Status
// ============================================

const adminUpdateStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).send({

                success: false,

                msg: "Order not found"

            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        return res.status(200).send({

            success: true,

            msg: "Order status updated",

            order

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while updating order"

        });

    }

};



// ============================================
// Delete Order
// ============================================

const deleteOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).send({

                success: false,

                msg: "Order not found"

            });

        }

        await Order.findByIdAndDelete(req.params.id);

        return res.status(200).send({

            success: true,

            msg: "Order deleted successfully"

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while deleting order"

        });

    }

};

module.exports = {

    placeOrder,

    getMyOrders,

    getOrderById,

    cancelOrder,

    getVendorOrders,

    updateOrderStatus,

    getAllOrders,

    adminGetOrder,

    adminUpdateStatus,

    deleteOrder

};