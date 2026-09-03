import { useEffect } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    Table
} from "react-bootstrap";

import {
    FaBoxOpen,
    FaEye,
    FaTimesCircle
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    getMyOrders,
    cancelOrder
} from "../../redux/orderSlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";
const Orders = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        orders,

        loading

    } = useSelector(

        state => state.order

    );

    useEffect(() => {

        dispatch(

            getMyOrders()

        );

    }, [dispatch]);
    if (loading) {

        return <Loader />;

    }

    if (orders.length === 0) {

        return (

            <EmptyState

                title="No Orders Found"

                description="Start shopping today."

            />

        );

    }
    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":

                return "warning";

            case "Confirmed":

                return "info";

            case "Packed":

                return "primary";

            case "Shipped":

                return "secondary";

            case "Out For Delivery":

                return "dark";

            case "Delivered":

                return "success";

            case "Cancelled":

                return "danger";

            default:

                return "secondary";

        }

    };
    return (

        <Container className="py-5">

            <Row>

                <Col>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h2 className="fw-bold mb-4">

                                <FaBoxOpen className="me-2 text-primary" />

                                My Orders

                            </h2>

                            <Table responsive hover>

                                <thead>

                                    <tr>

                                        <th>Order ID</th>

                                        <th>Date</th>

                                        <th>Items</th>

                                        <th>Total</th>

                                        <th>Status</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        orders.map((order) => (

                                            <tr key={order._id}>

                                                <td>

                                                    #{order._id.slice(-6)}

                                                </td>

                                                <td>

                                                    {

                                                        new Date(order.createdAt)

                                                            .toLocaleDateString()

                                                    }

                                                </td>

                                                <td>

                                                    {order.items.length}

                                                </td>

                                                <td>

                                                    ₹{order.totalAmount}

                                                </td>

                                                <td>

                                                    <Badge

                                                        bg={

                                                            getStatusColor(

                                                                order.orderStatus

                                                            )

                                                        }

                                                    >

                                                        {order.orderStatus}

                                                    </Badge>

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Button

                                                            size="sm"

                                                            variant="primary"

                                                            onClick={() =>

                                                                navigate(

                                                                    `/orders/${order._id}`

                                                                )

                                                            }

                                                        >

                                                            <FaEye />

                                                        </Button>

                                                        {

                                                            order.orderStatus === "Pending"

                                                            &&

                                                            (

                                                                <Button

                                                                    size="sm"

                                                                    variant="danger"

                                                                    onClick={() =>

                                                                        dispatch(

                                                                            cancelOrder(

                                                                                order._id

                                                                            )

                                                                        )

                                                                    }

                                                                >

                                                                    <FaTimesCircle />

                                                                </Button>

                                                            )

                                                        }

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

};

export default Orders;