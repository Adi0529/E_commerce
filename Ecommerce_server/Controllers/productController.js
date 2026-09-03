const Product = require("../model/Product");
const Category = require("../model/Category");
const Brand = require("../model/brand");
const fs = require("fs");
const path = require("path");

const createProduct = async (req, res) => {
    try {

        const {
            productName,
            description,
            category,
            brand,
            price,
            discountPrice,
            stock,
            specifications
        } = req.body;

        // Required Fields
        if (
            !productName ||
            !description ||
            !category ||
            !brand ||
            !price ||
            stock === undefined
        ) {
            return res.status(400).send({
                success: false,
                msg: "All required fields are mandatory"
            });
        }

        // Check Category
        const categoryExists = await Category.findById(category);

        if (!categoryExists || !categoryExists.isActive) {
            return res.status(404).send({
                success: false,
                msg: "Category not found"
            });
        }

        // Check Brand
        const brandExists = await Brand.findById(brand);

        if (!brandExists || !brandExists.isActive) {
            return res.status(404).send({
                success: false,
                msg: "Brand not found"
            });
        }

        // Check Brand belongs to Category
        if (brandExists.categoryId.toString() !== category) {
            return res.status(400).send({
                success: false,
                msg: "Selected brand does not belong to the selected category"
            });
        }

        // Thumbnail Required
        if (!req.files || !req.files.thumbnail) {
            return res.status(400).send({
                success: false,
                msg: "Thumbnail is required"
            });
        }

        const thumbnail =
            "uploads/products/thumbnails/" +
            req.files.thumbnail[0].filename;

        let images = [];

        if (req.files.images) {
            images = req.files.images.map(
                (img) =>
                    "uploads/products/images/" +
                    img.filename
            );
        }

        let specs = {};

        if (specifications) {
            specs = JSON.parse(specifications);
        }

        const product = await Product.create({
            vendor: req.user.id,
            productName,
            description,
            category,
            brand,
            price,
            discountPrice,
            stock,
            thumbnail,
            images,
            specifications: specs
        });

        return res.status(201).send({
            success: true,
            msg: "Product Added Successfully",
            product
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            msg: error.message
        });

    }
};
const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find({isActive: true}).populate("vendor", "name email");
        return res.status(200).send({success: true,total: products.length,products});
    }
    catch (error) {
        return res.status(500).send({success: false,msg: error.message});

    }

};
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("vendor", "name email mobile");

        if (!product) {
            return res.status(404).send({success: false,msg: "Product Not Found"});
        }
        return res.status(200).send({success: true,product});

    }

    catch (error) {
        return res.status(500).send({success: false,msg: error.message});
    }
};
const searchProducts = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const products = await Product.find({isActive: true,$or: [
                {productName: {$regex: keyword,$options: "i"}},
                {category: {$regex: keyword,$options: "i"}},
                {brand: {$regex: keyword,$options: "i"}}
            ]
        });

        return res.status(200).send({success: true,total: products.length,products});
    }
    catch (error) {
    return res.status(500).send({success: false,msg: error.message});
    }
};
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({category: req.params.category,isActive: true});
        return res.status(200).send({success: true,total: products.length,products});
    }
    catch (error) {
        return res.status(500).send({success: false,msg: error.message});
    }

};
const getVendorProducts = async (req, res) => {
    try {
        const products = await Product.find({vendor: req.user.id}).sort({ createdAt: -1 });
        return res.status(200).send({success: true,total: products.length,products});
    }
    catch (error) {
       console.log(error);
        return res.status(500).send({success: false,msg: error.message});
    }
};
const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({
                success: false,
                msg: "Product Not Found"
            });
        }

        // Vendor can update only own product
        if (
            req.user.role !== "Admin" &&
            product.vendor.toString() !== req.user.id
        ) {
            return res.status(403).send({
                success: false,
                msg: "You can update only your own products."
            });
        }

        const {
            productName,
            description,
            category,
            brand,
            price,
            discountPrice,
            stock,
            specifications
        } = req.body;

        // ===============================
        // Validate Category & Brand
        // ===============================

        if (category) {

            const categoryExists = await Category.findById(category);

            if (!categoryExists) {
                return res.status(404).send({
                    success: false,
                    msg: "Category not found"
                });
            }

        }

        if (brand) {

            const categoryId = category || product.category;

            const brandExists = await Brand.findOne({
                _id: brand,
                category: categoryId
            });

            if (!brandExists) {
                return res.status(400).send({
                    success: false,
                    msg: "Selected brand does not belong to selected category"
                });
            }

        }

        // ===============================
        // Update Fields
        // ===============================

        if (productName)
            product.productName = productName;

        if (description)
            product.description = description;

        if (category)
            product.category = category;

        if (brand)
            product.brand = brand;

        if (price !== undefined)
            product.price = price;

        if (discountPrice !== undefined)
            product.discountPrice = discountPrice;

        if (stock !== undefined)
            product.stock = stock;

        // ===============================
        // Specifications
        // ===============================

        if (specifications) {

            try {

                product.specifications = JSON.parse(specifications);

            }

            catch {

                return res.status(400).send({
                    success: false,
                    msg: "Invalid Specifications Format"
                });

            }

        }

        // ===============================
        // Update Thumbnail
        // ===============================

        if (req.files && req.files.thumbnail) {

            if (product.thumbnail) {

                const oldThumbnail = path.join(
                    __dirname,
                    "..",
                    product.thumbnail
                );

                if (fs.existsSync(oldThumbnail)) {
                    fs.unlinkSync(oldThumbnail);
                }

            }

            product.thumbnail =
                "uploads/products/thumbnails/" +
                req.files.thumbnail[0].filename;

        }

        // ===============================
        // Update Product Images
        // ===============================

        if (req.files && req.files.images) {

            if (product.images.length > 0) {

                product.images.forEach((image) => {

                    const imagePath = path.join(
                        __dirname,
                        "..",
                        image
                    );

                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }

                });

            }

            product.images = req.files.images.map(
                (image) =>
                    "uploads/products/images/" +
                    image.filename
            );

        }

        await product.save();

        const updatedProduct = await Product.findById(product._id)
            .populate("vendor", "Name Email")
            .populate("category", "categoryName")
            .populate("brand", "brandName");

        return res.status(200).send({
            success: true,
            msg: "Product Updated Successfully",
            product: updatedProduct
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
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).send({
                success: false,
                msg: "Product Not Found"
            });

        }

        if (product.vendor.toString() !== req.user.id) {

            return res.status(403).send({
                success: false,
                msg: "Unauthorized"
            });

        }

        if (product.thumbnail && fs.existsSync(product.thumbnail)) {
            fs.unlinkSync(product.thumbnail);
        }

        if (product.images.length > 0) {

            product.images.forEach((img) => {

                if (fs.existsSync(img)) {
                    fs.unlinkSync(img);
                }

            });

        }

        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).send({

            success: true,

            msg: "Product Deleted Successfully"

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            msg: error.message

        });

    }

};
const changeProductStatus = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).send({
                success: false,
                msg: "Product Not Found"
            });

        }

        if (product.vendor.toString() !== req.user.id) {

            return res.status(403).send({
                success: false,
                msg: "Unauthorized"
            });

        }

        product.isActive = !product.isActive;

        await product.save();

        return res.status(200).send({

            success: true,

            msg: "Status Updated",

            isActive: product.isActive

        });

    }

    catch (error) {

        return res.status(500).send({

            success: false,

            msg: error.message

        });

    }

};
const adminGetAllProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .populate("vendor", "name email");

        return res.status(200).send({

            success: true,

            total: products.length,

            products

        });

    }

    catch (error) {

        return res.status(500).send({

            success: false,

            msg: error.message

        });

    }

};
const adminDeleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).send({

                success: false,

                msg: "Product Not Found"

            });

        }

        if (product.thumbnail && fs.existsSync(product.thumbnail)) {
            fs.unlinkSync(product.thumbnail);
        }

        if (product.images.length > 0) {

            product.images.forEach((img) => {

                if (fs.existsSync(img)) {
                    fs.unlinkSync(img);
                }

            });

        }

        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).send({

            success: true,

            msg: "Product Deleted Successfully"

        });

    }

    catch (error) {

        return res.status(500).send({

            success: false,

            msg: error.message

        });

    }

};
const adminChangeProductStatus = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).send({

                success: false,

                msg: "Product Not Found"

            });

        }

        product.isActive = !product.isActive;

        await product.save();

        return res.status(200).send({

            success: true,

            msg: "Status Updated",

            isActive: product.isActive

        });

    }

    catch (error) {

        return res.status(500).send({

            success: false,

            msg: error.message

        });

    }

};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    getVendorProducts,
    updateProduct,
    deleteProduct,
    changeProductStatus,
    adminGetAllProducts,
    adminDeleteProduct,
    adminChangeProductStatus
};