import { useEffect, useState } from "react";

import {
    Card,
    Table,
    Button,
    Badge,
    Form,
    Modal,
    Row,
    Col
} from "react-bootstrap";

import {
    FaPlus,
    FaSearch,
    FaTrash,
    FaUserCheck,
    FaUserTimes
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getAllVendors,
    createVendor,
    toggleStatus,
    deleteUser
} from "../../redux/authSlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";
const Vendors = () => {

    const dispatch = useDispatch();

    const {

        vendors,

        loading

    } = useSelector(

        state => state.auth

    );
    const [show, setShow] = useState(false);

    const [search, setSearch] = useState("");

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: "",

        mobile: "",

        profileImage: null

    });
    useEffect(() => {

        dispatch(

            getAllVendors()

        );

    }, [dispatch]);
    const handleChange = (e) => {

        const {

            name,

            value,

            files

        } = e.target;

        if (name === "profileImage") {

            setForm({

                ...form,

                profileImage: files[0]

            });

        }

        else {

            setForm({

                ...form,

                [name]: value

            });

        }

    };
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach(key => {

            formData.append(

                key,

                form[key]

            );

        });

        dispatch(

            createVendor(formData)

        );

        setShow(false);

    };
    const filteredVendors = (vendors || []).filter(vendor => 
  vendor?.name?.toLowerCase().includes(search.toLowerCase())
);

    if (loading) {
        return <Loader />;
    }
    if (!vendors.length) {
        return (

            <EmptyState

                title="No Vendors Found"

            />

        );
    }
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">

                    Vendor Management

                </h2>

                <Button

                    onClick={() =>

                        setShow(true)

                    }

                >

                    <FaPlus className="me-2" />

                    Add Vendor

                </Button>

            </div>

            <Row className="mb-3">

                <Col md={6}>

                    <div className="position-relative">

                        <Form.Control

                            placeholder="Search Vendor"

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                        />

                        <FaSearch

                            className="position-absolute"

                            style={{

                                top: "12px",

                                right: "15px"

                            }}

                        />

                    </div>

                </Col>

            </Row>

            <Card className="shadow border-0 rounded-4">

                <Card.Body>

                    <Table hover responsive className="align-middle">

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Contact</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredVendors.map(vendor => (

                                    <tr key={vendor._id}>

                                        <td>

                                            <img

                                                src={`http://localhost:5006/${vendor.profileImage}`}

                                                alt=""

                                                style={{

                                                    width: "60px",

                                                    height: "60px",

                                                    borderRadius: "50%",

                                                    objectFit: "cover"

                                                }}

                                            />

                                        </td>

                                        <td>

                                            {vendor.name}

                                        </td>

                                        <td>

                                            {vendor.email}

                                        </td>

                                        <td>

                                            {vendor.mobile}

                                        </td>

                                        <td>

                                            <Badge

                                                bg={

                                                    vendor.isActive

                                                        ?

                                                        "success"

                                                        :

                                                        "danger"

                                                }

                                            >

                                                {

                                                    vendor.isActive

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

                                                    variant={

                                                        vendor.isActive

                                                            ?

                                                            "warning"

                                                            :

                                                            "success"

                                                    }

                                                    size="sm"

                                                    onClick={() =>

                                                        dispatch(

                                                            toggleStatus(

                                                                vendor._id

                                                            )

                                                        )

                                                    }

                                                >

                                                    {

                                                        vendor.isActive

                                                            ?

                                                            <FaUserTimes />

                                                            :

                                                            <FaUserCheck />

                                                    }

                                                </Button>

                                                <Button

                                                    variant="danger"

                                                    size="sm"

                                                    onClick={() => {

                                                        if (

                                                            window.confirm(

                                                                "Delete Vendor?"

                                                            )

                                                        ) {

                                                            dispatch(

                                                                deleteUser(

                                                                    vendor._id

                                                                )

                                                            )

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

            <Modal

                show={show}

                onHide={() => setShow(false)}

                size="lg"

            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        Create Vendor

                    </Modal.Title>

                </Modal.Header>

                <Form onSubmit={handleSubmit}>

                    <Modal.Body>

                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>Name</Form.Label>

                                    <Form.Control

                                        name="name"

                                        value={form.name}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>Email</Form.Label>

                                    <Form.Control

                                        type="email"

                                        name="email"

                                        value={form.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>Password</Form.Label>

                                    <Form.Control

                                        type="password"

                                        name="password"

                                        value={form.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>Contact</Form.Label>

                                    <Form.Control

                                        name="mobile"

                                        value={form.mobile}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={12}>

                                <Form.Group>

                                    <Form.Label>Profile Image</Form.Label>

                                    <Form.Control

                                        type="file"

                                        name="profileImage"

                                        onChange={handleChange}

                                    />

                                </Form.Group>

                            </Col>

                        </Row>

                    </Modal.Body>

                    <Modal.Footer>

                        <Button

                            variant="secondary"

                            onClick={() => setShow(false)}

                        >

                            Cancel

                        </Button>

                        <Button

                            type="submit"

                        >

                            Create Vendor

                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        </div>

    );

};

export default Vendors;