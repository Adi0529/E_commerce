const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const { auth, admin, Vendor } = require("../middleware/auth");

const upload = require("../middleware/uploads");


// Get all active products
router.get("/",productController.getAllProducts);

// Get single product
router.get("/:id",productController.getProductById);

// Search products
router.get("/search/:keyword",productController.searchProducts);

// Get products by category
router.get("/category/:category",productController.getProductsByCategory);


// =======================================================
// VENDOR ROUTES
// =======================================================

// Create Product
router.post("/create",auth, Vendor,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 5 }
    ]),
    productController.createProduct
);

// Get Logged-in Vendor Products
router.get("/vendor/my-products",auth,Vendor,productController.getVendorProducts);

// Update Product
router.put("/update/:id",auth,Vendor,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 5 }
    ]),
    productController.updateProduct
);

// Delete Product
router.delete("/delete/:id",auth,Vendor,productController.deleteProduct);

// Change Product Status (Active / Inactive)
router.patch("/status/:id",auth,Vendor,productController.changeProductStatus);


// =======================================================
// ADMIN ROUTES
// =======================================================

// Get All Products (including inactive)
router.get("/admin/all",auth,admin,productController.adminGetAllProducts);

// Delete Any Product
router.delete("/admin/delete/:id",auth,admin,productController.adminDeleteProduct);

// Change Any Product Status
router.patch("/admin/status/:id",auth,admin,productController.adminChangeProductStatus);

module.exports = router;