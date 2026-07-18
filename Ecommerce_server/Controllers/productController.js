const Product = require("../model/Product");
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

        if (!productName ||!description ||!category ||!price ||!stock) {
            return res.status(400).send({success: false,msg: "All required fields are mandatory"});
        }

        if (!req.files || !req.files.thumbnail) {
            return res.status(400).send({success: false,msg: "Thumbnail is required"});
        }

        const thumbnail ="uploads/products/thumbnails/" +req.files.thumbnail[0].filename;
        let images = [];
        if (req.files.images) {
            images = req.files.images.map((img) =>"uploads/products/images/" + img.filename);
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
        return res.status(201).send({success: true,msg: "Product Added Successfully",product});
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({success: false,msg: error.message});

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
            return res.status(404).send({success: false,msg: "Product Not Found"});
        }
        if (product.vendor.toString() !== req.user.id) {
            return res.status(403).send({success: false,msg: "You can update only your own products."});
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

        if (productName) product.productName = productName;
        if (description) product.description = description;
        if (category) product.category = category;
        if (brand) product.brand = brand;
        if (price) product.price = price;
        if (discountPrice) product.discountPrice = discountPrice;
        if (stock) product.stock = stock;

        if (specifications) {
            product.specifications = JSON.parse(specifications);
        }

        // Thumbnail Update
        if (req.files && req.files.thumbnail) {

            if (product.thumbnail && fs.existsSync(product.thumbnail)) {
                fs.unlinkSync(product.thumbnail);
            }

            product.thumbnail ="uploads/products/thumbnails/" +req.files.thumbnail[0].filename;
        }
        // Product Images Update
        if (req.files && req.files.images) {
            if (product.images.length > 0) {
                product.images.forEach((img) => {
                    if (fs.existsSync(img)) {
                        fs.unlinkSync(img);
                    }
                });
            }
            product.images = req.files.images.map((img) =>
                "uploads/products/images/" + img.filename
            );

        }

        await product.save();
        return res.status(200).send({success: true,msg: "Product Updated Successfully",product});

    }

    catch (error) {
        console.log(error);
        return res.status(500).send({success: false,msg: error.message});
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