const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

const { auth, admin } = require("../middleware/auth");

const upload = require("../middleware/uploads");


// =======================================
// PUBLIC ROUTES
// =======================================

// Get All Active Categories
router.get(
    "/",
    categoryController.getAllCategories
);

// Get Single Category
router.get(
    "/:id",
    categoryController.getCategoryById
);


// =======================================
// ADMIN ROUTES
// =======================================

// Create Category
router.post(
    "/create",
    auth,
    admin,
    upload.single("categoryImage"),
    categoryController.createCategory
);

// Update Category
router.put(
    "/update/:id",
    auth,
    admin,
    upload.single("categoryImage"),
    categoryController.updateCategory
);

// Delete Category
router.delete(
    "/delete/:id",
    auth,
    admin,
    categoryController.deleteCategory
);

// Activate / Deactivate Category
router.patch(
    "/status/:id",
    auth,
    admin,
    categoryController.changeCategoryStatus
);

module.exports = router;