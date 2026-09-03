import { useEffect, useState } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Table
} from "react-bootstrap";

import {
    FaMapMarkerAlt,
    FaCreditCard,
    FaCheckCircle
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { getMyCart } from "../../redux/cartSlice";

import { placeOrder } from "../../redux/orderSlice";

import Loader from "../../components/Loader";

const Checkout = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { cart, loading } = useSelector(
        state => state.cart
    );

    const { user } = useSelector(
        state => state.auth
    );

    const [formData, setFormData] = useState({

        fullName: user?.name || "",

        mobile: user?.mobile || "",

        address: "",

        city: "",

        state: "",

        pincode: "",

        paymentMethod: "Cash On Delivery"

    });

    useEffect(() => {

        dispatch(getMyCart());

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
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };
    const handleOrder = () => {

        dispatch(

            placeOrder({

                shippingAddress: {

                    fullName: formData.fullName,

                    mobile: formData.mobile,

                    address: formData.address,

                    city: formData.city,

                    state: formData.state,

                    pincode: formData.pincode

                },

                paymentMethod: formData.paymentMethod

            })

        ).then(() => {

            navigate("/orders");

        });

    };
    if (loading) {

        return <Loader />;

    }
    return (

        <Container className="py-5">

            <Row>

                <Col lg={8}>

                    <Card className="shadow border-0 rounded-4 mb-4">

                        <Card.Body>

                            <h3 className="fw-bold mb-4">

                                <FaMapMarkerAlt className="me-2 text-primary" />

                                Shipping Address

                            </h3>

                            <Row>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Full Name

                                        </Form.Label>

                                        <Form.Control

                                            name="fullName"

                                            value={formData.fullName}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Mobile

                                        </Form.Label>

                                        <Form.Control

                                            name="mobile"

                                            value={formData.mobile}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={12}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Address

                                        </Form.Label>

                                        <Form.Control

                                            name="address"

                                            value={formData.address}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={4}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            City

                                        </Form.Label>

                                        <Form.Control

                                            name="city"

                                            value={formData.city}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={4}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            State

                                        </Form.Label>

                                        <Form.Control

                                            name="state"

                                            value={formData.state}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={4}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Pincode

                                        </Form.Label>

                                        <Form.Control

                                            name="pincode"

                                            value={formData.pincode}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                            </Row>

                        </Card.Body>

                    </Card>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h4>

                                <FaCreditCard className="me-2" />

                                Payment Method

                            </h4>

                            <Form.Check

                                type="radio"

                                label="Cash On Delivery"

                                name="paymentMethod"

                                value="Cash On Delivery"

                                checked={

                                    formData.paymentMethod ===

                                    "Cash On Delivery"

                                }

                                onChange={handleChange}

                            />

                            <Form.Check

                                type="radio"

                                label="UPI"

                                name="paymentMethod"

                                value="UPI"

                                checked={

                                    formData.paymentMethod ===

                                    "UPI"

                                }

                                onChange={handleChange}

                            />

                            <Form.Check

                                type="radio"

                                label="Credit Card"

                                name="paymentMethod"

                                value="Credit Card"

                                checked={

                                    formData.paymentMethod ===

                                    "Credit Card"

                                }

                                onChange={handleChange}

                            />

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h4 className="fw-bold mb-4">

                                Order Summary

                            </h4>

                            <Table borderless>

                                <tbody>

                                    {

                                        cart.map((item) => (

                                            <tr key={item._id}>

                                                <td>

                                                    {item.product.productName}

                                                    ×

                                                    {item.quantity}

                                                </td>

                                                <td>

                                                    ₹{

                                                        item.product.price *

                                                        item.quantity

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </Table>

                            <hr />

                            <div className="d-flex justify-content-between">

                                <span>

                                    Subtotal

                                </span>

                                <span>

                                    ₹{subtotal.toFixed(2)}

                                </span>

                            </div>

                            <div className="d-flex justify-content-between">

                                <span>

                                    Shipping

                                </span>

                                <span>

                                    ₹{shipping.toFixed(2)}

                                </span>

                            </div>

                            <div className="d-flex justify-content-between">

                                <span>

                                    GST

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

                                size="lg"

                                className="w-100 mt-4"

                                onClick={handleOrder}

                            >

                                <FaCheckCircle className="me-2" />

                                Place Order

                            </Button>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

};

export default Checkout;