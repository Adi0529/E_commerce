const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();


const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            mobile,
            address,
            city,
            state,
            pincode
        } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).send({ success: false, msg: "Please fill all required fields" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).send({ success: false, msg: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileImage = req.file ? req.file.path : "";

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            address,
            city,
            state,
            pincode,
            profileImage,
            role: "User"
        });

        res.status(201).send({ success: true, msg: "Registration Successful", user });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "Registration Failed" });
    }
};

const login = async (req, res) => {

    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, msg: "Please enter email and password" });
        }
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(404).send({ success: false, msg: "User not found" });
        }

        if (!user.isActive) {
            return res.status(401).send({ success: false, msg: "Your account has been blocked" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send({ success: false, msg: "Invalid Password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        user.refreshToken = token;

        await user.save();

        res.status(200).send({ success: true, msg: "Login Successful", token, user });

    } catch (error) {

        console.log(error);

        res.status(500).send({ success: false, msg: "Login Failed" });

    }

};

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {refreshToken: ""});

        res.status(200).send({success: true,msg: "Logout Successful"});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,msg: "Logout Failed"});
    }

};
const getProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).send({success: false,msg: "User not found"});
        }

        res.status(200).send({success: true,user});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,msg: "Something went wrong"});
    }
};
const updateProfile = async (req, res) => {

    try {
        const {
            name,
            mobile,
            address,
            city,
            state,
            pincode
        } = req.body;
        const updateData = {
            name,
            mobile,
            address,
            city,
            state,
            pincode
        };

        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            {
                new: true
            }
        ).select("-password");

        res.status(200).send({success: true,msg: "Profile Updated Successfully",user});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,msg: "Update Failed"});
    }

};
const changePassword = async (req, res) => {
    try {
        const {
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send({success: false,msg: "Please fill all fields"});
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).send({success: false,msg: "New password and confirm password do not match"});
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send({success: false,msg: "User not found"});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).send({success: false,msg: "Old password is incorrect"});
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).send({success: true,msg: "Password changed successfully"});

    } catch (error) {

        console.log(error);
        res.status(500).send({success: false,msg: "Failed to change password"});
    }
};
const createVendor = async (req, res) => {

    try {
        const {
            name,
            email,
            password,
            mobile,
            address,
            city,
            state,
            pincode
        } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).send({success: false,msg: "Please fill all required fields"});
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({success: false,msg: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileImage = req.file ? req.file.path : "";

        const vendor = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            address,
            city,
            state,
            pincode,
            profileImage,
            role: "Vendor"
        });

        res.status(201).send({success: true,msg: "Vendor created successfully",vendor});

    } catch (error) {

        console.log(error);
        res.status(500).send({success: false,msg: "Failed to create vendor"});

    }

};
const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).send({success: true,totalUsers: users.length,users});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,msg: "Failed to fetch users"});
    }

};
const getAllVendors = async (req, res) => {

    try {

        const vendors = await User.find({role: "Vendor"}).select("-password");

        res.status(200).send({success: true,totalVendors: vendors.length,vendors});

    } catch (error) {

        console.log(error);

        res.status(500).send({success: false,msg: "Failed to fetch vendors"});

    }

};
const getUserById = async (req, res) => {

    try {

        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {

            return res.status(404).send({success: false,msg: "User not found"});
        }

        res.status(200).send({success: true,user});

    } catch (error) {

        console.log(error);

        res.status(500).send({success: false,msg: "Failed to fetch user"});

    }

};
const updateUser = async (req, res) => {

    try {
        const { id } = req.params;
        const {
            name,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            role
        } = req.body;

        const updateData = {
            name,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            role
        };
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).send({success: false,msg: "User not found"});
        }

        res.status(200).send({success: true,msg: "User updated successfully",user});

    } catch (error) {

        console.log(error);

        res.status(500).send({success: false,msg: "Failed to update user"});

    }

};

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({success: false,msg: "User not found"});
        }
        await User.findByIdAndDelete(id);

        res.status(200).send({success: true,msg: "User deleted successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,msg: "Failed to delete user"});

    }

};
const toggleStatus = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({success: false,msg: "User not found"});
        }

        user.isActive = !user.isActive;

        await user.save();

        res.status(200).send({success: true,msg: `User ${user.isActive ? "Activated" : "Blocked"} Successfully`,user});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,msg: "Failed to update status"});
    }

};


module.exports = {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    createVendor,
    getAllUsers,
    getAllVendors,
    getUserById,
    updateUser,
    deleteUser,
    toggleStatus
};