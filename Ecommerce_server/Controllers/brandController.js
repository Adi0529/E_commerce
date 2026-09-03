const Brand = require("../model/brand");
const Category = require("../model/Category");


// =======================================
// CREATE BRAND
// =======================================

exports.createBrand = async (req, res) => {

    try {

        const {
            brandName,
            categoryId
        } = req.body;

        if (!brandName || !categoryId) {

            return res.status(400).send({
                success: false,
                msg: "Brand Name and Category are required"
            });

        }

        const categoryExists = await Category.findById(categoryId);

        if (!categoryExists) {

            return res.status(404).send({
                success: false,
                msg: "Category not found"
            });

        }

        const brandExists = await Brand.findOne({
            brandName,
            categoryId
        });

        if (brandExists) {

            return res.status(400).send({
                success: false,
                msg: "Brand already exists in this category"
            });

        }

        const brand = await Brand.create({

            brandName,

            categoryId,

            brandLogo: req.file
                ? req.file.filename
                : ""

        });

        return res.status(201).send({

            success: true,

            msg: "Brand created successfully",

            brand

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

// =======================================
// GET ALL BRANDS
// =======================================

exports.getAllBrands = async (req, res) => {

    try {

        const brands = await Brand.find({

            isActive: true

        }).populate("categoryId", "categoryName");

        return res.status(200).send({

            success: true,

            total: brands.length,

            brands

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


// =======================================
// GET SINGLE BRAND
// =======================================

exports.getBrandById = async (req, res) => {

    try {

        const brand = await Brand.findById(req.params.id)

            .populate("categoryId", "categoryName");

        if (!brand) {

            return res.status(404).send({

                success: false,

                msg: "Brand not found"

            });

        }

        return res.status(200).send({

            success: true,

            brand

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


// =======================================
// GET BRANDS BY CATEGORY
// =======================================

exports.getBrandsByCategory = async (req, res) => {

    try {

        const brands = await Brand.find({

            categoryId: req.params.categoryId,

            isActive: true

        });

        return res.status(200).send({

            success: true,

            total: brands.length,

            brands

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


// =======================================
// UPDATE BRAND
// =======================================

exports.updateBrand = async (req, res) => {

    try {

        const { brandName, categoryId } = req.body;

        const brand = await Brand.findById(req.params.id);

        if (!brand) {

            return res.status(404).send({

                success: false,

                msg: "Brand not found"

            });

        }

        if (categoryId) {

            const categoryExists = await Category.findById(categoryId);

            if (!categoryExists) {

                return res.status(404).send({

                    success: false,

                    msg: "Category not found"

                });

            }

        }

        brand.brandName = brandName || brand.brandName;

        brand.categoryId = categoryId || brand.categoryId;

        if (req.file) {

            brand.brandLogo = req.file.filename;

        }

        await brand.save();

        return res.status(200).send({

            success: true,

            msg: "Brand updated successfully",

            brand

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


// =======================================
// DELETE BRAND
// =======================================

exports.deleteBrand = async (req, res) => {

    try {

        const brand = await Brand.findById(req.params.id);

        if (!brand) {

            return res.status(404).send({

                success: false,

                msg: "Brand not found"

            });

        }

        await Brand.findByIdAndDelete(req.params.id);

        return res.status(200).send({

            success: true,

            msg: "Brand deleted successfully"

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


// =======================================
// CHANGE BRAND STATUS
// =======================================

exports.changeBrandStatus = async (req, res) => {

    try {

        const brand = await Brand.findById(req.params.id);

        if (!brand) {

            return res.status(404).send({

                success: false,

                msg: "Brand not found"

            });

        }

        brand.isActive = !brand.isActive;

        await brand.save();

        return res.status(200).send({

            success: true,

            msg: `Brand ${brand.isActive ? "Activated" : "Deactivated"} Successfully`,

            brand

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