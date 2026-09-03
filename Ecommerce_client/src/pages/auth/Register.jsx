import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaImage,
    FaUserPlus,
    FaShoppingBag
} from "react-icons/fa";

import { registerUser } from "../../redux/authSlice";


const Register = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const { loading } = useSelector(
        (state) => state.auth
    );


    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const [imagePreview, setImagePreview] = useState(null);



    const [formData, setFormData] = useState({

        Name: "",

        Email: "",

        ContactNumber: "",

        Password: "",

        ConfirmPassword: "",

        profileImage: null

    });



    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };




    const handleImageChange = (e) => {


        const file = e.target.files[0];


        if (file) {

            setFormData({

                ...formData,

                profileImage: file

            });


            setImagePreview(
                URL.createObjectURL(file)
            );

        }


    };





    const handleSubmit = (e) => {


        e.preventDefault();



        if (
            formData.Password !==
            formData.ConfirmPassword
        ) {

            alert("Password does not match");

            return;

        }



        const data = new FormData();


        data.append("name", formData.Name.trim());
        data.append("email", formData.Email.trim());
        data.append("mobile", formData.ContactNumber);
        data.append("password", formData.Password);


        if (formData.profileImage) {

            data.append(
                "profileImage",
                formData.profileImage
            );

        }



        dispatch(registerUser(data))
            .unwrap()
            .then(() => {

                navigate("/");

            });


    };



    return (

        <div
            className="container-fluid"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to right,#6610f2,#0d6efd)"
            }}
        >


            <div
                className="row min-vh-100 justify-content-center align-items-center"
            >


                <div
                    className="col-lg-5 col-md-8"
                >


                    <div
                        className="card shadow-lg border-0 rounded-4"
                    >


                        <div
                            className="card-body p-5"
                        >


                            <div
                                className="text-center mb-4"
                            >


                                <FaShoppingBag

                                    size={55}

                                    className="text-primary"

                                />


                                <h2
                                    className="fw-bold mt-3"
                                >

                                    Create Account

                                </h2>


                                <p className="text-muted">

                                    Join our E-Commerce platform

                                </p>


                            </div>





                            <form
                                onSubmit={handleSubmit}
                            >


                                {/* Name */}

                                <div className="mb-3">


                                    <label className="form-label fw-semibold">

                                        Name

                                    </label>


                                    <div className="input-group">


                                        <span className="input-group-text">

                                            <FaUser />

                                        </span>


                                        <input

                                            type="text"

                                            name="Name"

                                            className="form-control"

                                            placeholder="Enter Name"

                                            value={formData.Name}

                                            onChange={handleChange}

                                            required

                                        />


                                    </div>


                                </div>





                                {/* Email */}


                                <div className="mb-3">


                                    <label className="form-label fw-semibold">

                                        Email

                                    </label>


                                    <div className="input-group">


                                        <span className="input-group-text">

                                            <FaEnvelope />

                                        </span>


                                        <input

                                            type="email"

                                            name="Email"

                                            className="form-control"

                                            placeholder="Enter Email"

                                            value={formData.Email}

                                            onChange={handleChange}

                                            required

                                        />


                                    </div>


                                </div>





                                {/* Contact Number */}


                                <div className="mb-3">


                                    <label className="form-label fw-semibold">

                                        Contact Number

                                    </label>


                                    <div className="input-group">


                                        <span className="input-group-text">

                                            <FaPhone />

                                        </span>


                                        <input

                                            type="text"

                                            name="ContactNumber"

                                            className="form-control"

                                            placeholder="Enter Mobile Number"

                                            value={formData.ContactNumber}

                                            onChange={handleChange}

                                            required

                                        />


                                    </div>


                                </div>
                                {/* Password */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">

                                        Password

                                    </label>


                                    <div className="input-group">


                                        <span className="input-group-text">

                                            <FaLock />

                                        </span>


                                        <input

                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }

                                            name="Password"

                                            className="form-control"

                                            placeholder="Enter Password"

                                            value={formData.Password}

                                            onChange={handleChange}

                                            required

                                        />


                                        <button

                                            type="button"

                                            className="btn btn-outline-secondary"

                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }

                                        >

                                            {
                                                showPassword
                                                    ?
                                                    <FaEyeSlash />
                                                    :
                                                    <FaEye />
                                            }


                                        </button>


                                    </div>


                                </div>





                                {/* Confirm Password */}


                                <div className="mb-3">


                                    <label className="form-label fw-semibold">

                                        Confirm Password

                                    </label>


                                    <div className="input-group">


                                        <span className="input-group-text">

                                            <FaLock />

                                        </span>



                                        <input


                                            type={
                                                showConfirmPassword
                                                    ?
                                                    "text"
                                                    :
                                                    "password"
                                            }


                                            name="ConfirmPassword"


                                            className="form-control"


                                            placeholder="Confirm Password"


                                            value={
                                                formData.ConfirmPassword
                                            }


                                            onChange={handleChange}


                                            required


                                        />



                                        <button


                                            type="button"


                                            className="btn btn-outline-secondary"



                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }



                                        >


                                            {

                                                showConfirmPassword

                                                    ?

                                                    <FaEyeSlash />

                                                    :

                                                    <FaEye />

                                            }


                                        </button>



                                    </div>



                                </div>






                                {/* Profile Image */}



                                <div className="mb-4">


                                    <label className="form-label fw-semibold">

                                        Profile Image

                                    </label>



                                    <div className="input-group">


                                        <span className="input-group-text">


                                            <FaImage />


                                        </span>



                                        <input


                                            type="file"


                                            className="form-control"


                                            accept="image/*"


                                            onChange={
                                                handleImageChange
                                            }


                                        />


                                    </div>



                                    {
                                        imagePreview &&

                                        <div
                                            className="text-center mt-3"
                                        >

                                            <img

                                                src={imagePreview}

                                                alt="preview"

                                                width="90"

                                                height="90"

                                                className="rounded-circle border"

                                            />

                                        </div>

                                    }


                                </div>






                                {/* Register Button */}


                                <button


                                    type="submit"


                                    className="btn btn-primary w-100 py-2 fw-bold"



                                    disabled={loading}



                                >



                                    {

                                        loading

                                            ?

                                            <>

                                                <span

                                                    className="spinner-border spinner-border-sm me-2"

                                                >

                                                </span>


                                                Registering...


                                            </>


                                            :

                                            <>


                                                <FaUserPlus className="me-2" />


                                                Create Account


                                            </>


                                    }


                                </button>



                            </form>





                            <hr />





                            <p className="text-center mb-0">


                                Already have an account?


                                <Link

                                    to="/"

                                    className="ms-2 fw-bold text-decoration-none"

                                >

                                    Login


                                </Link>


                            </p>





                        </div>


                    </div>


                </div>


            </div>


        </div>


    );

};


export default Register;