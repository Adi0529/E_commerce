import { useEffect } from "react";

import {

    Container,

    Row,

    Col,

    Card,

    Button,

    Table,

    Badge

} from "react-bootstrap";

import {

    FaTrash,

    FaMinus,

    FaPlus,

    FaShoppingCart,

    FaArrowRight

} from "react-icons/fa";

import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    useNavigate

} from "react-router-dom";

import {

    getMyCart,

    updateQuantity,

    removeFromCart,

    clearCart

} from "../../redux/cartSlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

const Cart = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        cart,

        loading

    } = useSelector(

        state => state.cart

    );

    useEffect(() => {

        dispatch(

            getMyCart()

        );

    }, [dispatch]);
    const subtotal = cart.reduce(

        (total, item) =>

            total +

            item.product.price *

            item.quantity,

        0

    );

    const shipping = subtotal > 1000 ? 0 : 100;

    const tax = subtotal * 0.18;

    const total = subtotal + shipping + tax;

    if (loading) {

        return <Loader />;

    }

    if (cart.length === 0) {

        return (

            <EmptyState

                title="Your Cart is Empty"

                description="Add products to start shopping."

            />

        );

    }
    return (

        <Container className="py-5">

            <Row>

                {/* Left Side */}

                <Col lg={8}>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h3 className="fw-bold mb-4">

                                <FaShoppingCart className="me-2" />

                                Shopping Cart

                            </h3>

                            <Table responsive hover>

                                <thead>

                                    <tr>

                                        <th>Product</th>

                                        <th>Price</th>

                                        <th>Qty</th>

                                        <th>Total</th>

                                        <th></th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        cart.map((item) => (

                                            <tr key={item._id}>

                                                <td>

                                                    <div className="d-flex align-items-center">

                                                        <img

                                                            src={`https://e-commerce-2-u41a.onrender.com/${item.product.thumbnail}`}

                                                            alt=""

                                                            width="70"

                                                            height="70"

                                                            className="rounded"

                                                        />

                                                        <div className="ms-3">

                                                            <h6>

                                                                {item.product.productName}

                                                            </h6>

                                                            <Badge bg="secondary">

                                                                {item.product.brand?.brandName}

                                                            </Badge>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td>

                                                    ₹{item.product.price}

                                                </td>

                                                <td>

                                                    <div className="d-flex align-items-center">

                                                        <Button

                                                            size="sm"

                                                            variant="outline-secondary"

                                                            onClick={() =>

                                                                dispatch(

                                                                    updateQuantity({

                                                                        id: item._id,

                                                                        quantity: item.quantity - 1

                                                                    })

                                                                )

                                                            }

                                                        >

                                                            <FaMinus />

                                                        </Button>

                                                        <span className="mx-3">

                                                            {item.quantity}

                                                        </span>

                                                        <Button

                                                            size="sm"

                                                            variant="outline-secondary"

                                                            onClick={() =>

                                                                dispatch(

                                                                    updateQuantity({

                                                                        id: item._id,

                                                                        quantity: item.quantity + 1

                                                                    })

                                                                )

                                                            }

                                                        >

                                                            <FaPlus />

                                                        </Button>

                                                    </div>

                                                </td>

                                                <td>

                                                    ₹{

                                                        item.quantity *

                                                        item.product.price

                                                    }

                                                </td>

                                                <td>

                                                    <Button

                                                        variant="danger"

                                                        size="sm"

                                                        onClick={() =>

                                                            dispatch(

                                                                removeFromCart(item._id)

                                                            )

                                                        }

                                                    >

                                                        <FaTrash />

                                                    </Button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </Table>
                        </Card.Body>

                    </Card>

                </Col>

                {/* Right Side */}

                <Col lg={4}>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h4 className="fw-bold mb-4">

                                Order Summary

                            </h4>

                            <div className="d-flex justify-content-between mb-2">

                                <span>

                                    Subtotal

                                </span>

                                <span>

                                    ₹{subtotal.toFixed(2)}

                                </span>

                            </div>

                            <div className="d-flex justify-content-between mb-2">

                                <span>

                                    Shipping

                                </span>

                                <span>

                                    ₹{shipping.toFixed(2)}

                                </span>

                            </div>

                            <div className="d-flex justify-content-between mb-2">

                                <span>

                                    GST (18%)

                                </span>

                                <span>

                                    ₹{tax.toFixed(2)}

                                </span>

                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">

                                <h5>Total</h5>

                                <h5>

                                    ₹{total.toFixed(2)}

                                </h5>

                            </div>

                            <Button

                                className="w-100 mt-4"

                                size="lg"

                                onClick={() =>

                                    navigate("/checkout")

                                }

                            >

                                Proceed To Checkout

                                <FaArrowRight className="ms-2" />

                            </Button>

                            <Button

                                variant="outline-danger"

                                className="w-100 mt-3"

                                onClick={() =>

                                    dispatch(clearCart())

                                }

                            >

                                Clear Cart

                            </Button>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

};

export default Cart;