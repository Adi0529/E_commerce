import { useEffect, useState } from "react";

import {
    Card,
    Table,
    Button,
    Badge,
    Form,
    Row,
    Col
} from "react-bootstrap";

import {
    FaTrash,
    FaToggleOn,
    FaToggleOff,
    FaEye
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    adminGetAllProducts,
    adminDeleteProduct,
    changeProductStatus
} from "../../redux/productSlice";

import { getCategories } from "../../redux/categorySlice";
import { getBrands} from "../../redux/brandSlice";
import { getAllVendors } from "../../redux/authSlice";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
const Products = () => {

    const dispatch = useDispatch();

    const {

        products,

        loading

    } = useSelector(

        state => state.product

    );

    const {

        categories

    } = useSelector(

        state => state.category

    );

    const {

        brands

    } = useSelector(

        state => state.brand

    );

    const {

        vendors

    } = useSelector(

        state => state.auth

    );
    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [brand, setBrand] = useState("");

    const [vendor, setVendor] = useState("");
    useEffect(() => {

        dispatch(adminGetAllProducts());

        dispatch(getCategories());

        dispatch(getBrands());

        dispatch(getAllVendors());

    }, [dispatch]);
    const filteredProducts = products.filter(product => {

        const searchMatch =

            product.productName

                .toLowerCase()

                .includes(search.toLowerCase());

        const categoryMatch =

            !category ||

            product.category?._id === category;

        const brandMatch =

            !brand ||

            product.brand?._id === brand;

        const vendorMatch =

            !vendor ||

            product.vendor?._id === vendor;

        return (

            searchMatch &&

            categoryMatch &&

            brandMatch &&

            vendorMatch

        );

    });
    if (loading) {
        return <Loader />;
    }
    if (!products.length) {
        return (

            <EmptyState

                title="No Products Found"

            />

        );
    }
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">

                    Product Management

                </h2>

            </div>

            <Row className="mb-4">

                <Col md={3}>

                    <Form.Control

                        placeholder="Search Product"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </Col>

                <Col md={3}>

                    <Form.Select

                        value={category}

                        onChange={(e) => setCategory(e.target.value)}

                    >

                        <option value="">All Categories</option>

                        {

                            categories.map(category => (

                                <option

                                    key={category._id}

                                    value={category._id}

                                >

                                    {category.categoryName}

                                </option>

                            ))

                        }

                    </Form.Select>

                </Col>

                <Col md={3}>

                    <Form.Select

                        value={brand}

                        onChange={(e) => setBrand(e.target.value)}

                    >

                        <option value="">All Brands</option>

                        {

                            brands.map(brand => (

                                <option

                                    key={brand._id}

                                    value={brand._id}

                                >

                                    {brand.brandName}

                                </option>

                            ))

                        }

                    </Form.Select>

                </Col>

                <Col md={3}>

                    <Form.Select

                        value={vendor}

                        onChange={(e) => setVendor(e.target.value)}

                    >

                        <option value="">All Vendors</option>

                        {

                            vendors.map(vendor => (

                                <option

                                    key={vendor._id}

                                    value={vendor._id}

                                >

                                    {vendor.Name}

                                </option>

                            ))

                        }

                    </Form.Select>

                </Col>

            </Row>

            <Card className="shadow border-0 rounded-4">

                <Card.Body>

                    <Table responsive hover className="align-middle">

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Name</th>

                                <th>Vendor</th>

                                <th>Category</th>

                                <th>Brand</th>

                                <th>Price</th>

                                <th>Stock</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredProducts.map(product => (

                                    <tr key={product._id}>

                                        <td>

                                            <img

                                                src={`http://localhost:5006/${product.thumbnail}`}

                                                alt=""

                                                style={{

                                                    width: "70px",

                                                    height: "70px",

                                                    objectFit: "cover",

                                                    borderRadius: "10px"

                                                }}

                                            />

                                        </td>

                                        <td>

                                            {product.productName}

                                        </td>

                                        <td>

                                            {product.vendor?.Name}

                                        </td>

                                        <td>

                                            {product.category?.categoryName}

                                        </td>

                                        <td>

                                            {product.brand?.brandName}

                                        </td>

                                        <td>

                                            ₹{product.price}

                                        </td>

                                        <td>

                                            {product.stock}

                                        </td>

                                        <td>

                                            <Badge

                                                bg={

                                                    product.isActive

                                                        ?

                                                        "success"

                                                        :

                                                        "secondary"

                                                }

                                            >

                                                {

                                                    product.isActive

                                                        ?

                                                        "Active"

                                                        :

                                                        "Inactive"

                                                }

                                            </Badge>

                                        </td>

                                        <td>

                                            <div className="d-flex gap-2">

                                                <Button

                                                    size="sm"

                                                    variant="info"

                                                >

                                                    <FaEye />

                                                </Button>

                                                <Button

                                                    size="sm"

                                                    variant={

                                                        product.isActive

                                                            ?

                                                            "secondary"

                                                            :

                                                            "success"

                                                    }

                                                    onClick={() => dispatch(

                                                        changeProductStatus(

                                                            product._id

                                                        )

                                                    )}

                                                >

                                                    {

                                                        product.isActive

                                                            ?

                                                            <FaToggleOn />

                                                            :

                                                            <FaToggleOff />

                                                    }

                                                </Button>

                                                <Button

                                                    size="sm"

                                                    variant="danger"

                                                    onClick={() => {

                                                        if (window.confirm("Delete Product?")) {

                                                            dispatch(

                                                                adminDeleteProduct(

                                                                    product._id

                                                                )

                                                            );

                                                        }

                                                    }}

                                                >

                                                    <FaTrash />

                                                </Button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

        </div>

    );

};

export default Products;