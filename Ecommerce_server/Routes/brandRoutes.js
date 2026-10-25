const express = require("express");

const router = express.Router();

const brandController = require("../Controllers/brandController");

const { auth, admin } = require("../middleware/auth");

const upload = require("../middleware/uploads");


// =======================================
// PUBLIC ROUTES
// =======================================

// Get All Active Brands
router.get(
    "/",
    brandController.getAllBrands
);

// Get Single Brand
router.get(
    "/:id",
    brandController.getBrandById
);

// Get Brands By Category
router.get(
    "/category/:categoryId",
    brandController.getBrandsByCategory
);


// =======================================
// ADMIN ROUTES
// =======================================

// Create Brand
router.post(
    "/create",
    auth,
    admin,
    upload.single("brandLogo"),
    brandController.createBrand
);

// Update Brand
router.put(
    "/update/:id",
    auth,
    admin,
    upload.single("brandLogo"),
    brandController.updateBrand
);

// Delete Brand
router.delete(
    "/delete/:id",
    auth,
    admin,
    brandController.deleteBrand
);

// Activate / Deactivate Brand
router.patch(
    "/status/:id",
    auth,
    admin,
    brandController.changeBrandStatus
);

module.exports = router;