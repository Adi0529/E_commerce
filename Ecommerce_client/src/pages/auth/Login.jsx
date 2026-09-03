import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShoppingBag,
    FaSignInAlt
} from "react-icons/fa";

import { loginUser } from "../../redux/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        isAuthenticated,
        user
    } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    useEffect(() => {
    if (!isAuthenticated || !user) return;

    const role = user.Role || user.role;

    if (role === "Admin") {
        navigate("/admin", { replace: true });
    } else if (role === "Vendor") {
        navigate("/vendor", { replace: true });
    } else {
        navigate("/home", { replace: true });
    }
}, [isAuthenticated, user]);

    return (

        <div
            className="container-fluid"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to right,#0d6efd,#6610f2)"
            }}
        >

            <div className="row min-vh-100 align-items-center justify-content-center">

                {/* Left Side */}

                <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-white p-5">

                    <FaShoppingBag size={90} className="mb-4" />

                    <h1 className="fw-bold display-4">E-Commerce</h1>

                    <h3 className="mt-3">Welcome Back!</h3>

                    <p className="mt-3 fs-5" style={{ maxWidth: "500px" }}>
                        Manage products, vendors, orders and shopping
                        from one modern dashboard.
                    </p>

                </div>

                {/* Right Side */}

                <div className="col-lg-4 col-md-8">

                    <div className="card border-0 shadow-lg rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center">

                                <FaShoppingBag size={55} className="text-primary" />

                                <h2 className="fw-bold mt-3">Login</h2>

                                <p className="text-muted">Sign in to continue</p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                {/* Email */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">Email</label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            <FaEnvelope />
                                        </span>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                {/* Password */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">Password</label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            <FaLock />
                                        </span>

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>

                                    </div>

                                </div>

                                {/* Login Button */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2 fw-bold"
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Logging In...
                                                </>
                                            )
                                            : (
                                                <>
                                                    <FaSignInAlt className="me-2" />
                                                    Login
                                                </>
                                            )
                                    }
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">
                                Don't have an account?
                                <Link to="/register" className="ms-2 text-decoration-none fw-bold">
                                    Register
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;