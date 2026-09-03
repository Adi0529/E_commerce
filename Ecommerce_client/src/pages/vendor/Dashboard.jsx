import { useEffect } from "react";

import {

    Row,

    Col,

    Card,

    Table,

    Badge

} from "react-bootstrap";

import {

    FaBoxOpen,

    FaShoppingBag,

    FaRupeeSign,

    FaClipboardList

} from "react-icons/fa";

import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    getVendorProducts

} from "../../redux/productSlice";

import {

    getVendorOrders

} from "../../redux/orderSlice";

import Loader from "../../components/Loader";
const Dashboard = () => {

    const dispatch = useDispatch();

    const {

        myProducts,

        loading

    } = useSelector(

        state => state.product

    );

    const {

        vendorOrders

    } = useSelector(

        state => state.order

    );

    useEffect(() => {

        dispatch(

            getVendorProducts()

        );

        dispatch(

            getVendorOrders()

        );

    }, [dispatch]);
    const totalProducts = myProducts.length;

const totalOrders = vendorOrders.length;

const totalRevenue = vendorOrders.reduce(

    (sum, order) =>

        sum + order.totalAmount,

    0

);

const activeProducts = myProducts.filter(

    item => item.isActive

).length;
if (loading) {

    return <Loader />;

}
return (

<div className="container-fluid py-4">

<h2 className="fw-bold mb-4">

Vendor Dashboard

</h2>

<Row className="g-4 mb-4">

<Col lg={3} md={6}>

<Card className="shadow border-0 rounded-4">

<Card.Body>

<FaBoxOpen

size={35}

className="text-primary mb-3"

/>

<h3>

{totalProducts}

</h3>

<p>

Total Products

</p>

</Card.Body>

</Card>

</Col>

<Col lg={3} md={6}>

<Card className="shadow border-0 rounded-4">

<Card.Body>

<FaClipboardList

size={35}

className="text-success mb-3"

/>

<h3>

{totalOrders}

</h3>

<p>

Orders

</p>

</Card.Body>

</Card>

</Col>

<Col lg={3} md={6}>

<Card className="shadow border-0 rounded-4">

<Card.Body>

<FaRupeeSign

size={35}

className="text-warning mb-3"

/>

<h3>

₹{totalRevenue}

</h3>

<p>

Revenue

</p>

</Card.Body>

</Card>

</Col>

<Col lg={3} md={6}>

<Card className="shadow border-0 rounded-4">

<Card.Body>

<FaShoppingBag

size={35}

className="text-danger mb-3"

/>

<h3>

{activeProducts}

</h3>

<p>

Active Products

</p>

</Card.Body>

</Card>

</Col>

</Row>

<Row>

<Col lg={8}>

<Card className="shadow border-0 rounded-4">

<Card.Body>

<h4 className="mb-4">

Recent Products

</h4>

<Table hover responsive>

<thead>

<tr>

<th>Name</th>

<th>Price</th>

<th>Stock</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

myProducts

.slice(0,5)

.map(product=>(

<tr key={product._id}>

<td>

{product.productName}

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

<Card className="shadow border-0 rounded-4">

<Card.Body>

<h4 className="mb-4">

Latest Orders

</h4>

{

vendorOrders

.slice(0,5)

.map(order=>(

<div

key={order._id}

className="border-bottom pb-3 mb-3"

>

<h6>

Order #

{order._id.slice(-6)}

</h6>

<p className="mb-1">

₹

{order.totalAmount}

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