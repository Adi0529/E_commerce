const Cart = require("../model/Cart");
const Product = require("../model/Product");



// ==========================================
// Add To Cart
// ==========================================

const addToCart = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).send({
                success: false,
                msg: "Product ID is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({
                success: false,
                msg: "Product not found"
            });
        }

        if (!product.isActive) {
            return res.status(400).send({
                success: false,
                msg: "Product is not available"
            });
        }

        const qty = quantity || 1;

        if (qty > product.stock) {
            return res.status(400).send({
                success: false,
                msg: `Only ${product.stock} item(s) available`
            });
        }

        const existingItem = await Cart.findOne({
            user: req.user.id,
            product: productId
        });

        if (existingItem) {

            existingItem.quantity += qty;

            if (existingItem.quantity > product.stock) {
                return res.status(400).send({
                    success: false,
                    msg: `Maximum available stock is ${product.stock}`
                });
            }

            await existingItem.save();

            return res.status(200).send({
                success: true,
                msg: "Cart updated successfully",
                cart: existingItem
            });

        }

        const cart = await Cart.create({

            user: req.user.id,

            product: productId,

            quantity: qty

        });

        return res.status(201).send({

            success: true,

            msg: "Product added to cart",

            cart

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while adding to cart"

        });

    }

};



// ==========================================
// Get My Cart
// ==========================================

const getMyCart = async (req, res) => {

    try {

        const cart = await Cart.find({

            user: req.user.id

        }).populate({

            path: "product",

            select: "productName thumbnail price discountPrice stock"

        });

        return res.status(200).send({

            success: true,

            totalItems: cart.length,

            cart

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching cart"

        });

    }

};



// ==========================================
// Update Quantity
// ==========================================

const updateQuantity = async (req, res) => {

    try {

        const { quantity } = req.body;

        if (!quantity || quantity < 1) {

            return res.status(400).send({

                success: false,

                msg: "Quantity must be greater than zero"

            });

        }

        const cartItem = await Cart.findById(req.params.id).populate("product");

        if (!cartItem) {

            return res.status(404).send({

                success: false,

                msg: "Cart item not found"

            });

        }

        if (cartItem.user.toString() !== req.user.id) {

            return res.status(403).send({

                success: false,

                msg: "Unauthorized"

            });

        }

        if (quantity > cartItem.product.stock) {

            return res.status(400).send({

                success: false,

                msg: `Only ${cartItem.product.stock} item(s) available`

            });

        }

        cartItem.quantity = quantity;

        await cartItem.save();

        return res.status(200).send({

            success: true,

            msg: "Quantity updated",

            cart: cartItem

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while updating quantity"

        });

    }

};
// ==========================================
// Remove From Cart
// ==========================================

const removeFromCart = async (req, res) => {

    try {

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {

            return res.status(404).send({
                success: false,
                msg: "Cart item not found"
            });

        }

        if (cartItem.user.toString() !== req.user.id) {

            return res.status(403).send({
                success: false,
                msg: "Unauthorized"
            });

        }

        await Cart.findByIdAndDelete(req.params.id);

        return res.status(200).send({
            success: true,
            msg: "Product removed from cart"
        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            msg: "Error while removing product from cart"
        });

    }

};



// ==========================================
// Clear Cart
// ==========================================

const clearCart = async (req, res) => {

    try {

        await Cart.deleteMany({
            user: req.user.id
        });

        return res.status(200).send({

            success: true,

            msg: "Cart cleared successfully"

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while clearing cart"

        });

    }

};



// ==========================================
// Get Cart Count
// ==========================================

const getCartCount = async (req, res) => {

    try {

        const count = await Cart.countDocuments({

            user: req.user.id

        });

        return res.status(200).send({

            success: true,

            count

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while getting cart count"

        });

    }

};



// ==========================================
// Get Cart Total
// ==========================================

const getCartTotal = async (req, res) => {

    try {

        const cart = await Cart.find({

            user: req.user.id

        }).populate({

            path: "product",

            select: "price discountPrice"

        });

        let totalPrice = 0;

        let totalQuantity = 0;

        let totalSavings = 0;

        cart.forEach((item) => {

            const product = item.product;

            const actualPrice = product.price;

            const sellingPrice =
                product.discountPrice > 0
                    ? product.discountPrice
                    : product.price;

            totalPrice += sellingPrice * item.quantity;

            totalQuantity += item.quantity;

            totalSavings +=
                (actualPrice - sellingPrice) * item.quantity;

        });

        return res.status(200).send({

            success: true,

            totalItems: cart.length,

            totalQuantity,

            totalSavings,

            totalPrice

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while calculating cart total"

        });

    }

};
// ==========================================
// Check Product Exists In Cart
// ==========================================

const isProductInCart = async (req, res) => {

    try {

        const cartItem = await Cart.findOne({

            user: req.user.id,

            product: req.params.productId

        });

        return res.status(200).send({

            success: true,

            isInCart: !!cartItem

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while checking cart"

        });

    }

};



// ==========================================
// Get Single Cart Item
// ==========================================

const getCartItem = async (req, res) => {

    try {

        const cartItem = await Cart.findById(req.params.id)
            .populate({
                path: "product",
                populate: {
                    path: "vendor",
                    select: "name email"
                }
            });

        if (!cartItem) {

            return res.status(404).send({

                success: false,

                msg: "Cart item not found"

            });

        }

        if (cartItem.user.toString() !== req.user.id) {

            return res.status(403).send({

                success: false,

                msg: "Unauthorized"

            });

        }

        return res.status(200).send({

            success: true,

            cart: cartItem

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Error while fetching cart item"

        });

    }

};



// ==========================================
// Checkout Cart
// ==========================================

const checkoutCart = async (req, res) => {

    try {

        const cart = await Cart.find({

            user: req.user.id

        }).populate("product");

        if (cart.length === 0) {

            return res.status(400).send({

                success: false,

                msg: "Your cart is empty"

            });

        }

        let totalAmount = 0;

        const items = [];

        for (const item of cart) {

            if (!item.product.isActive) {

                return res.status(400).send({

                    success: false,

                    msg: `${item.product.productName} is unavailable`

                });

            }

            if (item.quantity > item.product.stock) {

                return res.status(400).send({

                    success: false,

                    msg: `Only ${item.product.stock} ${item.product.productName} available`

                });

            }

            const sellingPrice =
                item.product.discountPrice > 0
                    ? item.product.discountPrice
                    : item.product.price;

            totalAmount += sellingPrice * item.quantity;

            items.push({

                product: item.product._id,

                productName: item.product.productName,

                price: sellingPrice,

                quantity: item.quantity,

                subtotal: sellingPrice * item.quantity

            });

        }

        return res.status(200).send({

            success: true,

            totalItems: cart.length,

            totalAmount,

            items,

            msg: "Cart is ready for order"

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Checkout failed"

        });

    }

};

module.exports = {

    addToCart,

    getMyCart,

    updateQuantity,

    removeFromCart,

    clearCart,

    getCartCount,

    getCartTotal,

    isProductInCart,

    getCartItem,

    checkoutCart

};