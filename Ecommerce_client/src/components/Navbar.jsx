import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    FaShoppingCart,
    FaUserCircle,
    FaSearch,
    FaSignOutAlt,
    FaStore,
    FaTachometerAlt,
    FaHome,
    FaBoxOpen
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { logoutUser } from "../redux/authSlice";
import { getCartCount } from "../redux/cartSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const { cartCount } = useSelector(
        (state) => state.cart
    );

    useEffect(() => {

        if (isAuthenticated && user?.role === "User") {
            dispatch(getCartCount());
        }

    }, [dispatch, isAuthenticated, user]);

    const searchProduct = (e) => {

        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        }

    };

    const logout = () => {

        dispatch(logoutUser());

        navigate("/login");

    };

    return (

        <nav
            className="navbar navbar-expand-lg shadow-lg sticky-top"
            style={{
                background:
                    "linear-gradient(90deg,#0f2027,#203a43,#2c5364)"
            }}
        >

            <div className="container">

                {/* Logo */}

                <Link
                    to="/home"
                    className="navbar-brand fw-bold fs-3 text-warning"
                >

                    🛍 ShopHub

                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    {/* Search */}

                    <form
                        onSubmit={searchProduct}
                        className="d-flex mx-auto"
                        style={{ width: "40%" }}
                    >

                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Search Products..."
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }
                        />

                        <button
                            className="btn btn-warning rounded-pill ms-2 px-4"
                        >

                            <FaSearch />

                        </button>

                    </form>

                    {/* Menu */}

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <Link
                                to="/home"
                                className="nav-link text-white fw-semibold"
                            >

                                <FaHome className="me-1" />

                                Home

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/products"
                                className="nav-link text-white fw-semibold"
                            >

                                <FaBoxOpen className="me-1" />

                                Products

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/categories"
                                className="nav-link text-white fw-semibold"
                            >

                                Categories

                            </Link>

                        </li>

                        {

                            user?.role === "User" &&

                            <li className="nav-item position-relative ms-2">

                                <Link
                                    to="/cart"
                                    className="nav-link text-white"
                                >

                                    <FaShoppingCart size={22} />

                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >

                                        {cartCount}

                                    </span>

                                </Link>

                            </li>

                        }

                        {/* User Dropdown */}

                        <li className="nav-item dropdown ms-3">

                            <a
                                href="#"
                                className="nav-link dropdown-toggle text-white fw-semibold"
                                data-bs-toggle="dropdown"
                            >

                                <FaUserCircle
                                    size={24}
                                    className="me-2"
                                />

                                {user?.Name}

                            </a>

                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">

                                <li>

                                    <Link
                                        to="/profile"
                                        className="dropdown-item"
                                    >

                                        <FaUserCircle className="me-2" />

                                        Profile

                                    </Link>

                                </li>

                                

                                {

                                    user?.role === "Vendor" &&

                                    <li>

                                        <Link
                                            to="/vendor"
                                            className="dropdown-item"
                                        >

                                            <FaStore className="me-2" />

                                            Vendor Dashboard

                                        </Link>

                                    </li>

                                }

                                {

                                    user?.role === "Admin" &&

                                    <li>

                                        <Link
                                            to="/admin"
                                            className="dropdown-item"
                                        >

                                            <FaTachometerAlt className="me-2" />

                                            Admin Dashboard

                                        </Link>

                                    </li>

                                }

                                <li>

                                    <hr className="dropdown-divider" />

                                </li>

                                <li>

                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={logout}
                                    >

                                        <FaSignOutAlt className="me-2" />

                                        Logout

                                    </button>

                                </li>

                            </ul>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;