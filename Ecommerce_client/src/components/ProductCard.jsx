import { Card, Badge, Button } from "react-bootstrap";
import {
    FaShoppingCart,
    FaEye,
    FaHeart,
    FaStar
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const discountPercentage =

        product.discountPrice > 0

            ? Math.round(
                  ((product.price - product.discountPrice) /
                      product.price) *
                      100
              )

            : 0;

    const handleAddToCart = () => {

        dispatch(
            addToCart({

                productId: product._id,

                quantity: 1

            })
        );

    };

    return (

        <Card

            className="border-0 shadow-sm h-100 rounded-4 overflow-hidden"

            style={{

                transition: ".3s",

                cursor: "pointer"

            }}

        >

            <div className="position-relative">

                <Card.Img

                    variant="top"

                    src={`https://e-commerce-2-u41a.onrender.com/${product.thumbnail}`}

                    style={{

                        height: "240px",

                        objectFit: "cover"

                    }}

                />

                {

                    discountPercentage > 0 && (

                        <Badge

                            bg="danger"

                            className="position-absolute top-0 start-0 m-2"

                        >

                            {discountPercentage}% OFF

                        </Badge>

                    )

                }

                <Button

                    variant="light"

                    className="position-absolute top-0 end-0 m-2 rounded-circle"

                >

                    <FaHeart className="text-danger" />

                </Button>

            </div>

            <Card.Body className="d-flex flex-column">

                <small className="text-muted">

                    {product.category?.categoryName ||

                        product.category}

                </small>

                <h5

                    className="fw-bold mt-2"

                    style={{

                        minHeight: "50px"

                    }}

                >

                    {product.productName}

                </h5>

                <div className="mb-2">

                    <FaStar className="text-warning" />

                    <FaStar className="text-warning" />

                    <FaStar className="text-warning" />

                    <FaStar className="text-warning" />

                    <FaStar className="text-warning" />

                    <span className="ms-2 text-muted">

                        ({product.totalReviews})

                    </span>

                </div>

                <div className="mb-3">

                    {

                        product.discountPrice > 0 ? (

                            <>

                                <span className="fw-bold fs-5 text-success">

                                    ₹{product.discountPrice}

                                </span>

                                <span className="text-decoration-line-through text-muted ms-2">

                                    ₹{product.price}

                                </span>

                            </>

                        ) : (

                            <span className="fw-bold fs-5">

                                ₹{product.price}

                            </span>

                        )

                    }

                </div>

                <div className="mt-auto d-grid gap-2">

                    <Button

                        variant="dark"

                        onClick={handleAddToCart}

                    >

                        <FaShoppingCart className="me-2" />

                        Add To Cart

                    </Button>

                    <Link

                        to={`/product/${product._id}`}

                        className="btn btn-outline-primary"

                    >

                        <FaEye className="me-2" />

                        View Details

                    </Link>

                </div>

            </Card.Body>

        </Card>

    );

};

export default ProductCard;