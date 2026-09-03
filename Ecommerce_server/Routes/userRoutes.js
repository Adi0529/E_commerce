const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userControllers");

const { auth, admin } = require("../middleware/auth");

const upload = require("../middleware/uploads");



// Register User
router.post("/register",upload.single("profileImage"),userController.register);

// Login
router.post("/login",userController.login);

// Logout
router.post("/logout",auth,userController.logout);

// Get Logged-in User
router.get("/profile",auth,userController.getProfile);

// Update Profile
router.put("/update-profile",auth,upload.single("profileImage"),userController.updateProfile);

// Change Password
router.put("/change-password",auth,userController.changePassword);


// ================= Admin Only =================

// Create Vendor
router.post("/create-vendor",auth,admin,upload.single("profileImage"),userController.createVendor);

// Get All Users
router.get("/users",auth,admin,userController.getAllUsers);

// Get All Vendors
router.get("/vendors",auth,admin,userController.getAllVendors);

// Get User by ID
router.get("/:id",auth,admin,userController.getUserById);

// Update User
router.put("/:id",auth,upload.single("profileImage"),userController.updateUser);

// Delete User
router.delete("/:id",auth,admin,userController.deleteUser);

// Activate/Deactivate User
router.patch(
    "/toggle-status/:id",
    auth,
    admin,
    userController.toggleStatus
);

module.exports = router;