import { useEffect } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Table,
    Button
} from "react-bootstrap";

import {
    FaArrowLeft,
    FaTruck,
    FaMapMarkerAlt,
    FaCreditCard,
    FaBox
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getOrderById,
    cancelOrder
} from "../../redux/orderSlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";
const OrderDetails = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const {

        selectedOrder,

        loading

    } = useSelector(

        state => state.order

    );

    useEffect(() => {

        dispatch(

            getOrderById(id)

        );

    }, [

        dispatch,

        id

    ]);
    if (loading) {

        return <Loader />;

    }

    if (!selectedOrder) {

        return (

            <EmptyState

                title="Order Not Found"

            />

        );

    }
    const getColor = (status) => {

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

            <Button

                variant="outline-primary"

                className="mb-4"

                onClick={() =>

                    navigate(-1)

                }

            >

                <FaArrowLeft className="me-2" />

                Back

            </Button>

            <Row>

                <Col lg={8}>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h3 className="fw-bold mb-4">

                                <FaBox className="me-2 text-primary" />

                                Ordered Products

                            </h3>

                            <Table responsive>

                                <tbody>

                                    {

                                        selectedOrder.items.map((item) => (

                                            <tr key={item._id}>

                                                <td width="90">

                                                    <img

                                                        src={`http://localhost:5006/${item.thumbnail}`}

                                                        alt=""

                                                        className="img-fluid rounded"

                                                        style={{

                                                            height: "70px",

                                                            objectFit: "cover"

                                                        }}

                                                    />

                                                </td>

                                                <td>

                                                    <h6>

                                                        {item.productName}

                                                    </h6>

                                                    <p className="text-muted mb-0">

                                                        Qty :

                                                        {item.quantity}

                                                    </p>

                                                </td>

                                                <td>

                                                    ₹{item.price}

                                                </td>

                                                <td>

                                                    ₹{item.subtotal}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0 rounded-4 mb-4">

                        <Card.Body>

                            <h5>

                                <FaTruck className="me-2" />

                                Order Status

                            </h5>

                            <Badge

                                bg={

                                    getColor(

                                        selectedOrder.orderStatus

                                    )

                                }

                                className="fs-6 mt-2"

                            >

                                {selectedOrder.orderStatus}

                            </Badge>

                            <hr />

                            <h5>

                                <FaMapMarkerAlt className="me-2" />

                                Shipping Address

                            </h5>

                            <p>

                                <strong>

                                    {selectedOrder.shippingAddress.fullName}

                                </strong>

                                <br />

                                {selectedOrder.shippingAddress.address}

                                <br />

                                {selectedOrder.shippingAddress.city}

                                <br />

                                {selectedOrder.shippingAddress.state}

                                -

                                {selectedOrder.shippingAddress.pincode}

                                <br />

                                Mobile :

                                {selectedOrder.shippingAddress.mobile}

                            </p>

                            <hr />

                            <h5>

                                <FaCreditCard className="me-2" />

                                Payment

                            </h5>

                            <p>

                                {selectedOrder.paymentMethod}

                            </p>

                            <hr />

                            <div className="d-flex justify-content-between">

                                <strong>

                                    Total

                                </strong>

                                <strong>

                                    ₹{selectedOrder.totalAmount}

                                </strong>

                            </div>

                            {

                                selectedOrder.orderStatus === "Pending"

                                &&

                                <Button

                                    variant="danger"

                                    className="w-100 mt-4"

                                    onClick={() =>

                                        dispatch(

                                            cancelOrder(

                                                selectedOrder._id

                                            )

                                        )

                                    }

                                >

                                    Cancel Order

                                </Button>

                            }

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

};

export default OrderDetails;