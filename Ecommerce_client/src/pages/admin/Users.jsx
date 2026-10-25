import { useEffect, useState } from "react";

import {
    Card,
    Table,
    Form,
    Badge,
    Button,
    Row,
    Col
} from "react-bootstrap";

import {
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
    getAllUsers,
    toggleStatus,
    deleteUser
} from "../../redux/authSlice";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
const Users = () => {

    const dispatch = useDispatch();

    const {

        users,

        loading

    } = useSelector(

        state => state.auth

    );

    const [search, setSearch] = useState("");

    const [role, setRole] = useState("");

    useEffect(() => {

        dispatch(

            getAllUsers()

        );

    }, [dispatch]);
    const filteredUsers = users.filter((user) => {

        const searchMatch =
            user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            user?.email?.toLowerCase().includes(search.toLowerCase());

        const roleMatch =
            !role || user?.role === role;

        return searchMatch && roleMatch;

    });
    if (loading)

        return <Loader />;
    if (!users.length)

        return (

            <EmptyState

                title="No Users Found"

            />

        );
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">

                    Users Management

                </h2>

            </div>

            <Row className="mb-4">

                <Col md={6}>

                    <div className="position-relative">

                        <Form.Control

                            placeholder="Search User"

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

                        value={role}

                        onChange={(e) =>

                            setRole(e.target.value)

                        }

                    >

                        <option value="">

                            All Roles

                        </option>

                        <option value="User">

                            User

                        </option>

                        <option value="Vendor">

                            Vendor

                        </option>

                        <option value="Admin">

                            Admin

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

                                <th>Profile</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Contact</th>

                                <th>Role</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredUsers.map(user => (

                                    <tr key={user._id}>

                                        <td>

                                            <img

                                                src={
                                                    user.profileImage? `https://e-commerce-2-u41a.onrender.com/${user.profileImage}`: "/default-user.png"
                                                }

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

                                            {user.name}

                                        </td>

                                        <td>

                                            {user.email}

                                        </td>

                                        <td>

                                            {user.mobile}

                                        </td>

                                        <td>

                                            <Badge bg="info">

                                                {user.role}

                                            </Badge>

                                        </td>

                                        <td>

                                            <Badge

                                                bg={

                                                    user.isActive

                                                        ?

                                                        "success"

                                                        :

                                                        "danger"

                                                }

                                            >

                                                {

                                                    user.isActive

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

                                                    size="sm"

                                                    variant={

                                                        user.isActive

                                                            ?

                                                            "warning"

                                                            :

                                                            "success"

                                                    }

                                                    onClick={() =>

                                                        dispatch(

                                                            toggleStatus(

                                                                user._id

                                                            )

                                                        )

                                                    }

                                                >

                                                    {

                                                        user.isActive

                                                            ?

                                                            <FaUserTimes />

                                                            :

                                                            <FaUserCheck />

                                                    }

                                                </Button>

                                                <Button

                                                    size="sm"

                                                    variant="danger"

                                                    onClick={() => {

                                                        if (

                                                            window.confirm(

                                                                "Delete User?"

                                                            )

                                                        ) {

                                                            dispatch(

                                                                deleteUser(

                                                                    user._id

                                                                )

                                                            );

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

        </div>

    );

};

export default Users;