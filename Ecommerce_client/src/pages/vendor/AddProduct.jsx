import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
    FaBox,
    FaRupeeSign,
    FaWarehouse,
    FaImage,
    FaPlusCircle
} from "react-icons/fa";

import { createProduct } from "../../redux/productSlice";
import { getCategories } from "../../redux/categorySlice";
import {
    getBrands,
    getBrandsByCategory
} from "../../redux/brandSlice";

const AddProduct = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading } = useSelector(
        (state) => state.product
    );

    const { categories } = useSelector(
        (state) => state.category
    );

    const { brands } = useSelector(
        (state) => state.brand
    );

    const [formData, setFormData] = useState({

        productName: "",

        description: "",

        category: "",

        brand: "",

        price: "",

        discountPrice: "",

        stock: "",

        thumbnail: null,

        images: []

    });

    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {

        dispatch(getCategories());

        dispatch(getBrands());

    }, [dispatch]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

        if (name === "category") {

            dispatch(getBrandsByCategory(value));

            setFormData((prev) => ({

                ...prev,

                category: value,

                brand: ""

            }));

        }

    };

    const handleThumbnail = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({

            ...prev,

            thumbnail: file

        }));

        setThumbnailPreview(

            URL.createObjectURL(file)

        );

    };

    const handleImages = (e) => {

        const files = [...e.target.files];

        setFormData((prev) => ({

            ...prev,

            images: files

        }));

        setImagePreview(

            files.map(file => URL.createObjectURL(file))

        );

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("productName", formData.productName);

        data.append("description", formData.description);

        data.append("category", formData.category);

        data.append("brand", formData.brand);

        data.append("price", formData.price);

        data.append(
            "discountPrice",
            formData.discountPrice || 0
        );

        data.append("stock", formData.stock);

        data.append(
            "thumbnail",
            formData.thumbnail
        );

        formData.images.forEach((image) => {

            data.append(
                "images",
                image
            );

        });

        dispatch(createProduct(data))

            .unwrap()

            .then(() => {

                navigate("/vendor/my-products");

            });

    };
    return (


        <div className="container-fluid">


            <div className="card shadow border-0">


                <div className="card-header bg-primary text-white">


                    <h4 className="mb-0">

                        <FaPlusCircle className="me-2" />

                        Add New Product

                    </h4>


                </div>




                <div className="card-body p-4">



                    <form onSubmit={handleSubmit}>




                        <div className="row">

                            {/* Product Name */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Product Name

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaBox />

                                    </span>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="productName"

                                        value={formData.productName}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                            </div>

                            {/* Category */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <select

                                    className="form-select"

                                    name="category"

                                    value={formData.category}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Category

                                    </option>

                                    {

                                        categories.map((category) => (

                                            <option

                                                key={category._id}

                                                value={category._id}

                                            >

                                                {category.categoryName}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* Brand */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Brand

                                </label>

                                <select

                                    className="form-select"

                                    name="brand"

                                    value={formData.brand}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Brand

                                    </option>

                                    {

                                        brands.map((brand) => (

                                            <option

                                                key={brand._id}

                                                value={brand._id}

                                            >

                                                {brand.brandName}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* Price */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Price

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaRupeeSign />

                                    </span>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="price"

                                        value={formData.price}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                            </div>

                            {/* Discount Price */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Discount Price

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="discountPrice"

                                    value={formData.discountPrice}

                                    onChange={handleChange}

                                />

                            </div>

                            {/* Stock */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Stock

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaWarehouse />

                                    </span>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="stock"

                                        value={formData.stock}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                            </div>

                            {/* Description */}

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea

                                    className="form-control"

                                    rows="4"

                                    name="description"

                                    value={formData.description}

                                    onChange={handleChange}

                                    required

                                />

                            </div>
                            {/* Thumbnail */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold">

                                    Product Thumbnail

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaImage />

                                    </span>

                                    <input

                                        type="file"

                                        className="form-control"

                                        accept="image/*"

                                        onChange={handleThumbnail}

                                        required

                                    />

                                </div>

                                {

                                    thumbnailPreview &&

                                    <div className="mt-3">

                                        <img

                                            src={thumbnailPreview}

                                            alt="Thumbnail"

                                            width="120"

                                            height="120"

                                            className="rounded shadow"

                                        />

                                    </div>

                                }

                            </div>

                            {/* Product Images */}

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold">

                                    Product Images

                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <FaImage />

                                    </span>

                                    <input

                                        type="file"

                                        className="form-control"

                                        accept="image/*"

                                        multiple

                                        onChange={handleImages}

                                    />

                                </div>

                                {

                                    imagePreview.length > 0 &&

                                    <div className="d-flex flex-wrap gap-2 mt-3">

                                        {

                                            imagePreview.map((image, index) => (

                                                <img

                                                    key={index}

                                                    src={image}

                                                    alt="Preview"

                                                    width="80"

                                                    height="80"

                                                    className="rounded shadow"

                                                />

                                            ))

                                        }

                                    </div>

                                }

                            </div>

                            {/* Submit */}

                            <div className="col-12">

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100 py-2"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ?

                                            <>

                                                <span className="spinner-border spinner-border-sm me-2"></span>

                                                Adding Product...

                                            </>

                                            :

                                            <>

                                                <FaPlusCircle className="me-2" />

                                                Add Product

                                            </>

                                    }

                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};



export default AddProduct;