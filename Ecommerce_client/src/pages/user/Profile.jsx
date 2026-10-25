import { useState } from "react";

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from "react-bootstrap";

import {
    FaUserCircle,
    FaLock,
    FaSave
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import {
    updateProfile,
    changePassword
} from "../../redux/authSlice";
const Profile = () => {

    const dispatch = useDispatch();

    const { user, loading } = useSelector(

        state => state.auth

    );

    const [profile, setProfile] = useState({

        Name: user?.Name || "",

        Email: user?.Email || "",

        ContactNumber: user?.ContactNumber || "",

        profileImage: null

    });

    const [password, setPassword] = useState({

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    });
    const handleProfileChange = (e) => {

        const { name, value, files } = e.target;

        setProfile({

            ...profile,

            [name]: files ? files[0] : value

        });

    };

    const handlePasswordChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        });

    };
    const handleUpdateProfile = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("Name", profile.Name);

        formData.append("Email", profile.Email);

        formData.append("ContactNumber", profile.ContactNumber);

        if (profile.profileImage) {

            formData.append(

                "profileImage",

                profile.profileImage

            );

        }

        dispatch(updateProfile(formData));

    };
    const handleChangePassword = (e) => {

        e.preventDefault();

        if (

            password.newPassword !==

            password.confirmPassword

        ) {

            return alert(

                "Passwords do not match"

            );

        }

        dispatch(

            changePassword({

                oldPassword: password.oldPassword,

                newPassword: password.newPassword

            })

        );

    };
    return (

        <Container className="py-5">

            <Row>

                <Col lg={4}>

                    <Card className="shadow border-0 rounded-4 text-center">

                        <Card.Body>

                            {

                                user?.profileImage ?

                                    <img

                                        src={`https://e-commerce-2-u41a.onrender.com/${user.profileImage}`}

                                        alt=""

                                        className="rounded-circle mb-3"

                                        width="150"

                                        height="150"

                                    />

                                    :

                                    <FaUserCircle

                                        size={150}

                                        className="text-secondary mb-3"

                                    />

                            }

                            <h4>

                                {user?.Name}

                            </h4>

                            <p className="text-muted">

                                {user?.Role}

                            </p>

                            <hr />

                            <p>

                                <strong>Email</strong>

                                <br />

                                {user?.Email}

                            </p>

                            <p>

                                <strong>Contact</strong>

                                <br />

                                {user?.ContactNumber}

                            </p>

                            <p>

                                <strong>Member Since</strong>

                                <br />

                                {

                                    new Date(

                                        user?.createdAt

                                    ).toLocaleDateString()

                                }

                            </p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={8}>

                    <Card className="shadow border-0 rounded-4 mb-4">

                        <Card.Body>

                            <h4 className="mb-4">

                                <FaSave className="me-2" />

                                Edit Profile

                            </h4>

                            <Form onSubmit={handleUpdateProfile}>

                                <Row>

                                    <Col md={6}>

                                        <Form.Group className="mb-3">

                                            <Form.Label>

                                                Name

                                            </Form.Label>

                                            <Form.Control

                                                name="Name"

                                                value={profile.Name}

                                                onChange={handleProfileChange}

                                            />

                                        </Form.Group>

                                    </Col>

                                    <Col md={6}>

                                        <Form.Group className="mb-3">

                                            <Form.Label>

                                                Email

                                            </Form.Label>

                                            <Form.Control

                                                name="Email"

                                                value={profile.Email}

                                                onChange={handleProfileChange}

                                            />

                                        </Form.Group>

                                    </Col>

                                    <Col md={6}>

                                        <Form.Group className="mb-3">

                                            <Form.Label>

                                                Contact Number

                                            </Form.Label>

                                            <Form.Control

                                                name="ContactNumber"

                                                value={profile.ContactNumber}

                                                onChange={handleProfileChange}

                                            />

                                        </Form.Group>

                                    </Col>

                                    <Col md={6}>

                                        <Form.Group className="mb-3">

                                            <Form.Label>

                                                Profile Image

                                            </Form.Label>

                                            <Form.Control

                                                type="file"

                                                name="profileImage"

                                                onChange={handleProfileChange}

                                            />

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Button

                                    type="submit"

                                    disabled={loading}

                                >

                                    Update Profile

                                </Button>

                            </Form>

                        </Card.Body>

                    </Card>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h4 className="mb-4">

                                <FaLock className="me-2" />

                                Change Password

                            </h4>

                            <Form onSubmit={handleChangePassword}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Current Password

                                    </Form.Label>

                                    <Form.Control

                                        type="password"

                                        name="oldPassword"

                                        value={password.oldPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        New Password

                                    </Form.Label>

                                    <Form.Control

                                        type="password"

                                        name="newPassword"

                                        value={password.newPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Confirm Password

                                    </Form.Label>

                                    <Form.Control

                                        type="password"

                                        name="confirmPassword"

                                        value={password.confirmPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </Form.Group>

                                <Button

                                    type="submit"

                                    variant="dark"

                                    disabled={loading}

                                >

                                    Change Password

                                </Button>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

};

export default Profile;