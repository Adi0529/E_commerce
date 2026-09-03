import { useEffect, useState } from "react";

import {
    Card,
    Table,
    Form,
    Badge,
    Row,
    Col,
    Button
} from "react-bootstrap";

import {
    FaSearch,
    FaEye
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getVendorOrders,
    updateOrderStatus
} from "../../redux/orderSlice";

import Loader from "../../components/Loader";

const Orders = () => {

    const dispatch = useDispatch();

    const {

        vendorOrders,

        loading

    } = useSelector(

        state => state.order

    );

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() => {

        dispatch(

            getVendorOrders()

        );

    }, [dispatch]);
    const filteredOrders = vendorOrders.filter(order => {

        const customer = order.user?.Name || "";

        const orderId = order._id || "";

        const searchMatch =

            customer.toLowerCase().includes(search.toLowerCase()) ||

            orderId.toLowerCase().includes(search.toLowerCase());

        const statusMatch =

            !status ||

            order.orderStatus === status;

        return searchMatch && statusMatch;

    });
    if (loading)

        return <Loader />;
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">

                    Vendor Orders

                </h2>

            </div>

            <Row className="mb-4">

                <Col md={6}>

                    <div className="position-relative">

                        <Form.Control

                            placeholder="Search Orders"

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

                <Col md={6}>

                    <Form.Select

                        value={status}

                        onChange={(e) =>

                            setStatus(e.target.value)

                        }

                    >

                        <option value="">

                            All Status

                        </option>

                        <option>

                            Pending

                        </option>

                        <option>

                            Confirmed

                        </option>

                        <option>

                            Packed

                        </option>

                        <option>

                            Shipped

                        </option>

                        <option>

                            Out For Delivery

                        </option>

                        <option>

                            Delivered

                        </option>

                        <option>

                            Cancelled

                        </option>

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

                                <th>Order ID</th>

                                <th>Customer</th>

                                <th>Products</th>

                                <th>Amount</th>

                                <th>Payment</th>

                                <th>Status</th>

                                <th>Update</th>

                                <th>View</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredOrders.map(order => (

                                    <tr key={order._id}>

                                        <td>

                                            {order._id.slice(-8)}

                                        </td>

                                        <td>

                                            <strong>

                                                {order.user?.Name}

                                            </strong>

                                            <br />

                                            <small>

                                                {order.user?.Email}

                                            </small>

                                        </td>

                                        <td>

                                            {

                                                order.items.map(item => (

                                                    <div key={item._id}>

                                                        {item.productName}

                                                        ×

                                                        {item.quantity}

                                                    </div>

                                                ))

                                            }

                                        </td>

                                        <td>

                                            ₹{order.totalAmount}

                                        </td>

                                        <td>

                                            {order.paymentMethod}

                                        </td>

                                        <td>

                                            <Badge bg="primary">

                                                {order.orderStatus}

                                            </Badge>

                                        </td>

                                        <td>

                                            <Form.Select

                                                value={order.orderStatus}

                                                onChange={(e) =>

                                                    dispatch(

                                                        updateOrderStatus({

                                                            id: order._id,

                                                            status: e.target.value

                                                        })

                                                    )

                                                }

                                            >

                                                <option>

                                                    Pending

                                                </option>

                                                <option>

                                                    Confirmed

                                                </option>

                                                <option>

                                                    Packed

                                                </option>

                                                <option>

                                                    Shipped

                                                </option>

                                                <option>

                                                    Out For Delivery

                                                </option>

                                                <option>

                                                    Delivered

                                                </option>

                                                <option>

                                                    Cancelled

                                                </option>

                                            </Form.Select>

                                        </td>

                                        <td>

                                            <Button

                                                size="sm"

                                                variant="outline-primary"

                                            >

                                                <FaEye />

                                            </Button>

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

export default Orders;