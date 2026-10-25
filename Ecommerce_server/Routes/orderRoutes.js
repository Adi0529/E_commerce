const express = require("express");

const router = express.Router();

const orderController = require("../Controllers/orderController");

const { auth, Vendor, admin } = require("../middleware/auth");


// USER
router.post("/placeOrder", auth, orderController.placeOrder);

router.get("/getMyOrders", auth, orderController.getMyOrders);

router.get("/getOrder/:id", auth, orderController.getOrderById);

router.patch("/cancelOrder/:id", auth, orderController.cancelOrder);


// VENDOR
router.get("/vendorOrders", auth, Vendor, orderController.getVendorOrders);

router.patch("/updateOrderStatus/:id", auth, Vendor, orderController.updateOrderStatus);


// ADMIN
router.get("/getAllOrders", auth, admin, orderController.getAllOrders);

router.get("/getOrderDetails/:id", auth, admin, orderController.adminGetOrder);

router.patch("/adminUpdateStatus/:id", auth, admin, orderController.adminUpdateStatus);

router.delete("/deleteOrder/:id", auth, admin, orderController.deleteOrder);

module.exports = router;