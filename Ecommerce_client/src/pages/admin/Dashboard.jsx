import { useEffect } from "react";

import {

    Row,

    Col,

    Card,

    Table,

    Badge

} from "react-bootstrap";

import {

    FaUsers,

    FaStore,

    FaBoxes,

    FaShoppingCart,

    FaRupeeSign,

    FaTags,

    FaLayerGroup

} from "react-icons/fa";

import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    getAllUsers,

    getAllVendors

} from "../../redux/authSlice";

import {

    adminGetAllProducts

} from "../../redux/productSlice";

import {

    getCategories

} from "../../redux/categorySlice";

import {

    getBrands

} from "../../redux/brandSlice";

import {

    getAllOrders

} from "../../redux/orderSlice";

import Loader from "../../components/Loader";
const Dashboard = () => {

    const dispatch = useDispatch();

    const {

        users,

        vendors,

        loading

    } = useSelector(

        state => state.auth

    );

    const {

        products

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

        orders

    } = useSelector(

        state => state.order

    );
    useEffect(() => {

        dispatch(

            getAllUsers()

        );

        dispatch(

            getAllVendors()

        );

        dispatch(

            adminGetAllProducts()

        );

        dispatch(

            getCategories()

        );

        dispatch(

            getBrands()

        );

        dispatch(

            getAllOrders()

        );

    }, [dispatch]);
    const totalRevenue =

        orders.reduce(

            (sum, item) =>

                sum + item.totalAmount,

            0

        );

    const activeProducts =

        products.filter(

            item => item.isActive

        ).length;
    if (loading)

        return <Loader />;
    return (

        <div className="container-fluid py-4">

            <h2 className="fw-bold mb-4">

                Admin Dashboard

            </h2>

            <Row className="g-4">

                <Col lg={3} md={6}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <FaUsers

                                size={35}

                                className="text-primary mb-3"

                            />

                            <h3>

                                {users.length}

                            </h3>

                            <p>Total Users</p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3} md={6}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <FaStore

                                size={35}

                                className="text-success mb-3"

                            />

                            <h3>

                                {vendors.length}

                            </h3>

                            <p>Vendors</p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3} md={6}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <FaBoxes

                                size={35}

                                className="text-warning mb-3"

                            />

                            <h3>

                                {activeProducts}

                            </h3>

                            <p>Products</p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3} md={6}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <FaShoppingCart

                                size={35}

                                className="text-danger mb-3"

                            />

                            <h3>

                                {orders.length}

                            </h3>

                            <p>Orders</p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0 mt-3">

                        <Card.Body>

                            <FaRupeeSign

                                size={30}

                                className="text-success"

                            />

                            <h4 className="mt-3">

                                ₹{totalRevenue}

                            </h4>

                            <p>Total Revenue</p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0 mt-3">

                        <Card.Body>

                            <FaLayerGroup

                                size={30}

                                className="text-info"

                            />

                            <h4 className="mt-3">

                                {categories.length}

                            </h4>

                            <p>Categories</p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0 mt-3">

                        <Card.Body>

                            <FaTags

                                size={30}

                                className="text-secondary"

                            />

                            <h4 className="mt-3">

                                {brands.length}

                            </h4>

                            <p>Brands</p>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row className="mt-4">

                <Col lg={8}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <h4 className="mb-4">

                                Latest Products

                            </h4>

                            <Table hover responsive>

                                <thead>

                                    <tr>

                                        <th>Name</th>

                                        <th>Vendor</th>

                                        <th>Price</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        products

                                            .slice(0, 5)

                                            .map(product => (

                                                <tr key={product._id}>

                                                    <td>

                                                        {product.productName}

                                                    </td>

                                                    <td>

                                                        {product.vendor?.Name}

                                                    </td>

                                                    <td>

                                                        ₹{product.price}

                                                    </td>

                                                    <td>

                                                        <Badge

                                                            bg={

                                                                product.isActive

                                                                    ?

                                                                    "success"

                                                                    :

                                                                    "danger"

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

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow border-0">

                        <Card.Body>

                            <h4>

                                Recent Orders

                            </h4>

                            {

                                orders

                                    .slice(0, 5)

                                    .map(order => (

                                        <div

                                            key={order._id}

                                            className="border-bottom py-3"

                                        >

                                            <h6>

                                                #{order._id.slice(-6)}

                                            </h6>

                                            <p>

                                                {order.user?.Name}

                                            </p>

                                            <p>

                                                ₹{order.totalAmount}

                                            </p>

                                            <Badge bg="primary">

                                                {order.orderStatus}

                                            </Badge>

                                        </div>

                                    ))

                            }

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </div>

    );

};

export default Dashboard;