const Category = require("../model/Category");

const fs = require("fs");
const path = require("path");

// ===================================================
// CREATE CATEGORY
// ===================================================

const createCategory = async (req, res) => {

    try {

        const {
            categoryName,
            description
        } = req.body;

        const categoryExists = await Category.findOne({
            categoryName: categoryName.trim()
        });

        if (categoryExists) {

            return res.status(400).send({
                success: false,
                msg: "Category already exists"
            });

        }

        const category = await Category.create({

            categoryName,

            description,

            categoryImage: req.file
                ? req.file.filename
                : ""

        });

        return res.status(201).send({

            success: true,

            msg: "Category created successfully",

            category

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Server Error",

            error: error.message

        });

    }

};



// ===================================================
// GET ALL ACTIVE CATEGORIES
// ===================================================

const getAllCategories = async (req, res) => {

    try {

        const categories = await Category.find({

            isActive: true

        }).sort({

            categoryName: 1

        });

        return res.status(200).send({

            success: true,

            total: categories.length,

            categories

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Server Error",

            error: error.message

        });

    }

};



// ===================================================
// GET CATEGORY BY ID
// ===================================================

const getCategoryById = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {

            return res.status(404).send({

                success: false,

                msg: "Category not found"

            });

        }

        return res.status(200).send({

            success: true,

            category

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Server Error",

            error: error.message

        });

    }

};



// ===================================================
// UPDATE CATEGORY
// ===================================================

const updateCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {

            return res.status(404).send({

                success: false,

                msg: "Category not found"

            });

        }

        category.categoryName =
            req.body.categoryName || category.categoryName;

        category.description =
            req.body.description || category.description;

        if (req.file) {

            if (category.categoryImage) {

                const imagePath = path.join(

                    __dirname,

                    "..",

                    "uploads",

                    "categories",

                    category.categoryImage

                );

                if (fs.existsSync(imagePath)) {

                    fs.unlinkSync(imagePath);

                }

            }

            category.categoryImage = req.file.filename;

        }

        await category.save();

        return res.status(200).send({

            success: true,

            msg: "Category updated successfully",

            category

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Server Error",

            error: error.message

        });

    }

};



// ===================================================
// DELETE CATEGORY
// ===================================================

const deleteCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {

            return res.status(404).send({

                success: false,

                msg: "Category not found"

            });

        }

        if (category.categoryImage) {

            const imagePath = path.join(

                __dirname,

                "..",

                "uploads",

                "categories",

                category.categoryImage

            );

            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);

            }

        }

        await Category.findByIdAndDelete(req.params.id);

        return res.status(200).send({

            success: true,

            msg: "Category deleted successfully"

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Server Error",

            error: error.message

        });

    }

};



// ===================================================
// CHANGE CATEGORY STATUS
// ===================================================

const changeCategoryStatus = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {

            return res.status(404).send({

                success: false,

                msg: "Category not found"

            });

        }

        category.isActive = !category.isActive;

        await category.save();

        return res.status(200).send({

            success: true,

            msg: `Category ${category.isActive ? "Activated" : "Deactivated"} Successfully`,

            category

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: "Server Error",

            error: error.message

        });

    }

};



module.exports = {

    createCategory,

    getAllCategories,

    getCategoryById,

    updateCategory,

    deleteCategory,

    changeCategoryStatus

};