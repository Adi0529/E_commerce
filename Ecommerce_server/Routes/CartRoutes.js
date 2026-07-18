const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");


// =======================================
// CART
// =======================================

// Add Product To Cart
router.post(
    "/addToCart",
    auth,
    cartController.addToCart
);

// Get My Cart
router.get(
    "/getMyCart",
    auth,
    cartController.getMyCart
);

// Update Quantity
router.patch(
    "/updateQuantity/:id",
    auth,
    cartController.updateQuantity
);

// Remove Product From Cart
router.delete(
    "/removeFromCart/:id",
    auth,
    cartController.removeFromCart
);

// Clear Complete Cart
router.delete(
    "/clearCart",
    auth,
    cartController.clearCart
);

// Get Cart Count
router.get(
    "/getCartCount",
    auth,
    cartController.getCartCount
);

// Get Cart Total
router.get(
    "/getCartTotal",
    auth,
    cartController.getCartTotal
);


// =======================================
// EXTRA ROUTES
// =======================================

// Check if product exists in cart
router.get(
    "/isInCart/:productId",
    auth,
    cartController.isProductInCart
);

// Move all cart items to checkout
router.post(
    "/checkout",
    auth,
    cartController.checkoutCart
);

// Get single cart item
router.get(
    "/item/:id",
    auth,
    cartController.getCartItem
);

module.exports = router;