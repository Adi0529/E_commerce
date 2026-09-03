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
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaToggleOn,
    FaToggleOff
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    getVendorProducts,
    deleteProduct,
    changeProductStatus
} from "../../redux/productSlice";

import {
    getCategories
} from "../../redux/categorySlice";

import {
    getBrandsByCategory
} from "../../redux/brandSlice";

import Loader from "../../components/Loader";
const MyProducts = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        myProducts,

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
    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [brand, setBrand] = useState("");
    useEffect(() => {

        dispatch(

            getVendorProducts()

        );

        dispatch(

            getCategories()

        );

    }, [dispatch]);
    const handleCategory = (e) => {

        const value = e.target.value;

        setCategory(value);

        setBrand("");

        if (value) {

            dispatch(

                getBrandsByCategory(value)

            );

        }

    };
    const filteredProducts = myProducts.filter(product => {

        const matchSearch = product.productName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            !category ||
            product.category?._id === category;

        const matchBrand =
            !brand ||
            product.brand?._id === brand;

        return (

            matchSearch &&
            matchCategory &&
            matchBrand

        );

    });
    if (loading)

        return <Loader />;
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    My Products

                </h2>

                <Button

                    onClick={() =>

                        navigate("/vendor/add-product")

                    }

                >

                    <FaPlus className="me-2" />

                    Add Product

                </Button>

            </div>



            <Row className="mb-4">

                <Col md={4}>

                    <div className="position-relative">

                        <Form.Control

                            placeholder="Search Product"

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                        />

                        <FaSearch

                            className="position-absolute"

                            style={{

                                top: "12px",

                                right: "15px",

                                color: "gray"

                            }}

                        />

                    </div>

                </Col>

                <Col md={4}>

                    <Form.Select

                        value={category}

                        onChange={handleCategory}

                    >

                        <option value="">

                            All Categories

                        </option>

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

                <Col md={4}>

                    <Form.Select

                        value={brand}

                        onChange={(e) =>

                            setBrand(e.target.value)

                        }

                    >

                        <option value="">

                            All Brands

                        </option>

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

            </Row>



            <Card className="shadow border-0 rounded-4">

                <Card.Body>

                    <Table

                        responsive

                        hover

                        className="align-middle"

                    >

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Name</th>

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

                                                    objectFit: "cover"

                                                }}

                                                className="rounded"

                                            />

                                        </td>

                                        <td>

                                            {product?.productName}

                                        </td>

                                        <td>

                                            {product?.category?.categoryName}

                                        </td>

                                        <td>

                                            {product?.brand?.brandName}

                                        </td>

                                        <td>

                                            ₹{product.price}

                                        </td>

                                        <td>

                                            {

                                                product.stock > 0 ?

                                                    <Badge bg="success">

                                                        {product.stock}

                                                    </Badge>

                                                    :

                                                    <Badge bg="danger">

                                                        Out Of Stock

                                                    </Badge>

                                            }

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

                                                    variant="warning"

                                                    onClick={() =>

                                                        navigate(

                                                            `/vendor/edit-product/${product._id}`

                                                        )

                                                    }

                                                >

                                                    <FaEdit />

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

                                                    onClick={() =>

                                                        dispatch(

                                                            changeProductStatus(

                                                                product._id

                                                            )

                                                        )

                                                    }

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

                                                        if (

                                                            window.confirm(

                                                                "Delete Product?"

                                                            )

                                                        ) {

                                                            dispatch(

                                                                deleteProduct(

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

export default MyProducts;