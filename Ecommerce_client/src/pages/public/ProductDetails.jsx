import { useEffect, useState } from "react";

import {

    Container,

    Row,

    Col,

    Card,

    Button,

    Badge,

    Form

} from "react-bootstrap";

import {

    FaShoppingCart,

    FaBolt,

    FaStar,

    FaTruck,

    FaUndo,

    FaShieldAlt,

    FaHeart,

    FaShareAlt

} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import {

    getProductById,

    getAllProducts

} from "../../redux/productSlice";

import { addToCart } from "../../redux/cartSlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {

        product,

        products,

        loading

    } = useSelector(

        state => state.product

    );

    const [selectedImage, setSelectedImage] = useState("");

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        dispatch(getProductById(id));

        dispatch(getAllProducts());

    }, [dispatch, id]);

    useEffect(() => {

        if (product) {

            setSelectedImage(product.thumbnail);

        }

    }, [product]);

    if (loading) {

        return <Loader />;

    }

    if (!product) {

        return (

            <EmptyState

                title="Product Not Found"

            />

        );

    }

    const relatedProducts = products.filter(

        item =>

            item.category?._id === product.category?._id &&

            item._id !== product._id

    );

    return (

        <Container className="py-5">

            <Row className="g-5">

                {/* ================= IMAGES ================= */}

                <Col lg={5}>

                    <Card className="border-0 shadow rounded-4">

                        <Card.Body>

                            <img

                                src={`http://localhost:5006/${selectedImage}`}

                                className="img-fluid rounded"

                                style={{

                                    width: "100%",

                                    height: "420px",

                                    objectFit: "contain"

                                }}

                                alt=""

                            />

                        </Card.Body>

                    </Card>

                    <Row className="mt-3">

                        <Col xs={3}>

                            <img

                                src={`http://localhost:5006/${product.thumbnail}`}

                                className={`img-fluid rounded border p-1 ${selectedImage === product.thumbnail ? "border-primary" : ""}`}

                                style={{

                                    cursor: "pointer",

                                    height: "90px",

                                    objectFit: "contain"

                                }}

                                onClick={() =>

                                    setSelectedImage(

                                        product.thumbnail

                                    )

                                }

                                alt=""

                            />

                        </Col>

                        {

                            product.images?.map(

                                (img, index) => (

                                    <Col

                                        xs={3}

                                        key={index}

                                    >

                                        <img

                                            src={`http://localhost:5006/${img}`}

                                            className={`img-fluid rounded border p-1 ${selectedImage === img ? "border-primary" : ""}`}

                                            style={{

                                                cursor: "pointer",

                                                height: "90px",

                                                objectFit: "contain"

                                            }}

                                            onClick={() =>

                                                setSelectedImage(img)

                                            }

                                            alt=""

                                        />

                                    </Col>

                                )

                            )

                        }

                    </Row>

                </Col>

                {/* ================= PRODUCT INFO ================= */}

                <Col lg={7}>

                    <h2 className="fw-bold">

                        {product.productName}

                    </h2>

                    <div className="mt-2">

                        <Badge bg="success">

                            {product.brand?.brandName}

                        </Badge>

                        <Badge

                            bg="primary"

                            className="ms-2"

                        >

                            {product.category?.categoryName}

                        </Badge>

                    </div>

                    <div className="mt-3 d-flex align-items-center">

                        <FaStar

                            className="text-warning"

                        />

                        <span className="ms-2 fw-bold">

                            {product.rating}

                        </span>

                        <span className="text-muted ms-2">

                            (

                            {

                                product.totalReviews

                            }

                            Reviews)

                        </span>

                    </div>

                    <div className="mt-4">

                        <h2 className="text-danger fw-bold">

                            ${product.discountPrice || product.price}

                        </h2>

                        {

                            product.discountPrice > 0 &&

                            <>

                                <del className="text-muted">

                                    ${product.price}

                                </del>

                                <Badge

                                    bg="danger"

                                    className="ms-3"

                                >

                                    Save $

                                    {

                                        product.price -

                                        product.discountPrice

                                    }

                                </Badge>

                            </>

                        }

                    </div>

                    <p className="mt-4">

                        {product.description}

                    </p>

                    <h5>

                        Stock :

                        {

                            product.stock > 0 ?

                                <Badge

                                    bg="success"

                                    className="ms-2"

                                >

                                    In Stock

                                </Badge>

                                :

                                <Badge

                                    bg="danger"

                                    className="ms-2"

                                >

                                    Out Of Stock

                                </Badge>

                        }

                    </h5>
                                        {/* ================= QUANTITY ================= */}

                    <div className="d-flex align-items-center mt-4">

                        <h5 className="me-3 mb-0">

                            Quantity

                        </h5>

                        <Button

                            variant="outline-secondary"

                            disabled={quantity <= 1}

                            onClick={() =>

                                setQuantity(

                                    quantity - 1

                                )

                            }

                        >

                            -

                        </Button>

                        <Form.Control

                            value={quantity}

                            readOnly

                            className="mx-2 text-center"

                            style={{

                                width: "80px"

                            }}

                        />

                        <Button

                            variant="outline-secondary"

                            disabled={

                                quantity >= product.stock

                            }

                            onClick={() =>

                                setQuantity(

                                    quantity + 1

                                )

                            }

                        >

                            +

                        </Button>

                    </div>





                    {/* ================= ACTION BUTTONS ================= */}

                    <div className="d-grid gap-3 mt-4">

                        <Button

                            size="lg"

                            variant="warning"

                            disabled={

                                product.stock === 0

                            }

                            onClick={() =>

                                dispatch(

                                    addToCart({

                                        productId: product._id,

                                        quantity

                                    })

                                )

                            }

                        >

                            <FaShoppingCart className="me-2"/>

                            Add To Cart

                        </Button>





                        <Button

                            size="lg"

                            variant="danger"

                            disabled={

                                product.stock === 0

                            }

                            onClick={() => {

                                dispatch(

                                    addToCart({

                                        productId: product._id,

                                        quantity

                                    })

                                );

                                navigate("/checkout");

                            }}

                        >

                            <FaBolt className="me-2"/>

                            Buy Now

                        </Button>

                    </div>





                    {/* ================= EXTRA BUTTONS ================= */}

                    <div className="d-flex gap-3 mt-3">

                        <Button

                            variant="outline-danger"

                            className="flex-fill"

                        >

                            <FaHeart className="me-2"/>

                            Wishlist

                        </Button>





                        <Button

                            variant="outline-primary"

                            className="flex-fill"

                        >

                            <FaShareAlt className="me-2"/>

                            Share

                        </Button>

                    </div>





                    {/* ================= DELIVERY INFO ================= */}

                    <Row className="mt-5 g-3">

                        <Col md={4}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100"

                            >

                                <Card.Body>

                                    <FaTruck

                                        size={35}

                                        className="text-primary"

                                    />

                                    <h6 className="mt-3">

                                        Free Delivery

                                    </h6>

                                    <small className="text-muted">

                                        Free shipping on eligible orders.

                                    </small>

                                </Card.Body>

                            </Card>

                        </Col>





                        <Col md={4}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100"

                            >

                                <Card.Body>

                                    <FaUndo

                                        size={35}

                                        className="text-success"

                                    />

                                    <h6 className="mt-3">

                                        Easy Returns

                                    </h6>

                                    <small className="text-muted">

                                        7 Days Replacement Policy.

                                    </small>

                                </Card.Body>

                            </Card>

                        </Col>





                        <Col md={4}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100"

                            >

                                <Card.Body>

                                    <FaShieldAlt

                                        size={35}

                                        className="text-warning"

                                    />

                                    <h6 className="mt-3">

                                        Secure Payment

                                    </h6>

                                    <small className="text-muted">

                                        100% Safe & Secure Payments.

                                    </small>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>





                    {/* ================= PRODUCT HIGHLIGHTS ================= */}

                    <Card

                        className="border-0 shadow-sm rounded-4 mt-5"

                    >

                        <Card.Body>

                            <h4 className="fw-bold mb-3">

                                Product Highlights

                            </h4>

                            <ul className="mb-0">

                                <li>

                                    Premium Quality Product

                                </li>

                                <li>

                                    Genuine Brand Warranty

                                </li>

                                <li>

                                    Fast Delivery Available

                                </li>

                                <li>

                                    Easy Replacement

                                </li>

                                <li>

                                    Secure Online Payment

                                </li>

                            </ul>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>
                        {/* ==========================================
                    PRODUCT SPECIFICATIONS
            =========================================== */}

            <Row className="mt-5">

                <Col lg={8}>

                    <Card className="border-0 shadow rounded-4">

                        <Card.Body>

                            <h3 className="fw-bold mb-4">

                                Specifications

                            </h3>

                            {

                                product.specifications &&

                                Object.keys(product.specifications).length > 0 ?

                                (

                                    <table className="table table-bordered">

                                        <tbody>

                                            {

                                                Object.entries(

                                                    product.specifications

                                                ).map(

                                                    ([key,value])=>(

                                                        <tr key={key}>

                                                            <th

                                                                style={{

                                                                    width:"35%"

                                                                }}

                                                            >

                                                                {key}

                                                            </th>

                                                            <td>

                                                                {value}

                                                            </td>

                                                        </tr>

                                                    )

                                                )

                                            }

                                        </tbody>

                                    </table>

                                )

                                :

                                (

                                    <p className="text-muted">

                                        No Specifications Available

                                    </p>

                                )

                            }

                        </Card.Body>

                    </Card>

                </Col>





                <Col lg={4}>

                    <Card className="border-0 shadow rounded-4">

                        <Card.Body>

                            <h4 className="fw-bold mb-4">

                                Product Summary

                            </h4>

                            <p>

                                <strong>Brand :</strong>

                                {" "}

                                {

                                    product.brand?.brandName

                                }

                            </p>

                            <p>

                                <strong>Category :</strong>

                                {" "}

                                {

                                    product.category?.categoryName

                                }

                            </p>

                            <p>

                                <strong>Rating :</strong>

                                {" "}

                                {

                                    product.rating

                                }

                            </p>

                            <p>

                                <strong>Total Reviews :</strong>

                                {" "}

                                {

                                    product.totalReviews

                                }

                            </p>

                            <p>

                                <strong>Availability :</strong>

                                {" "}

                                {

                                    product.stock > 0

                                    ?

                                    "In Stock"

                                    :

                                    "Out Of Stock"

                                }

                            </p>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>





            {/* ==========================================
                    DESCRIPTION
            =========================================== */}

            <Row className="mt-5">

                <Col>

                    <Card className="border-0 shadow rounded-4">

                        <Card.Body>

                            <h3 className="fw-bold mb-4">

                                Product Description

                            </h3>

                            <p

                                className="text-muted"

                                style={{

                                    lineHeight:"30px"

                                }}

                            >

                                {

                                    product.description

                                }

                            </p>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>





            {/* ==========================================
                    CUSTOMER REVIEWS
            =========================================== */}

            <Row className="mt-5">

                <Col>

                    <Card className="border-0 shadow rounded-4">

                        <Card.Body>

                            <div className="d-flex justify-content-between">

                                <h3 className="fw-bold">

                                    Customer Reviews

                                </h3>

                                <Badge

                                    bg="warning"

                                    className="fs-6"

                                >

                                    {

                                        product.rating

                                    }

                                    <FaStar className="ms-2"/>

                                </Badge>

                            </div>

                            <hr/>

                            <div className="text-center py-4">

                                <FaStar

                                    size={50}

                                    className="text-warning"

                                />

                                <h4 className="mt-3">

                                    No Reviews Yet

                                </h4>

                                <p className="text-muted">

                                    Be the first customer to review this product.

                                </p>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>





            {/* ==========================================
                    RELATED PRODUCTS
            =========================================== */}

            <Row className="mt-5">

                <Col>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2 className="fw-bold">

                            Related Products

                        </h2>

                    </div>

                </Col>

            </Row>





            <Row className="g-4">

                {

                    relatedProducts.length > 0 ?

                    (

                        relatedProducts

                        .slice(0,4)

                        .map((item)=>(

                            <Col

                                lg={3}

                                md={6}

                                key={item._id}

                            >

                                <Card

                                    className="border-0 shadow h-100 rounded-4"

                                    style={{

                                        cursor:"pointer"

                                    }}

                                    onClick={()=>

                                        navigate(

                                            `/product/${item._id}`

                                        )

                                    }

                                >

                                    <Card.Img

                                        variant="top"

                                        src={

                                            `http://localhost:5006/${item.thumbnail}`

                                        }

                                        style={{

                                            height:"220px",

                                            objectFit:"contain",

                                            padding:"15px"

                                        }}

                                    />

                                    <Card.Body>

                                        <h6

                                            className="fw-bold"

                                            style={{

                                                minHeight:"48px"

                                            }}

                                        >

                                            {

                                                item.productName

                                            }

                                        </h6>

                                        <div className="d-flex justify-content-between align-items-center mt-3">

                                            <h5 className="text-danger">

                                                $

                                                {

                                                    item.discountPrice ||

                                                    item.price

                                                }

                                            </h5>

                                            <Badge bg="success">

                                                {

                                                    item.rating

                                                }

                                                <FaStar className="ms-1"/>

                                            </Badge>

                                        </div>

                                    </Card.Body>

                                </Card>

                            </Col>

                        ))

                    )

                    :

                    (

                        <Col>

                            <EmptyState

                                title="No Related Products"

                            />

                        </Col>

                    )

                }

            </Row>

        </Container>

    );

};

export default ProductDetails;