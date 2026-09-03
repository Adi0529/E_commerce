import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowRight
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {

    const year = new Date().getFullYear();

    return (

        <footer className="bg-dark text-white mt-0">

            {/* Newsletter */}

            <div className="container py-5 border-bottom">

                <div className="row align-items-center">

                    <div className="col-lg-6">

                        <h3 className="fw-bold">

                            Subscribe to our Newsletter

                        </h3>

                        <p className="text-light mb-0">

                            Get the latest offers, discounts and new arrivals.

                        </p>

                    </div>

                    <div className="col-lg-6 mt-4 mt-lg-0">

                        <div className="input-group">

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                            />

                            <button className="btn btn-primary">

                                Subscribe

                            </button>

                        </div>

                    </div>

                </div>

            </div>



            {/* Footer */}

            <div className="container py-5">

                <div className="row gy-4">

                    {/* Company */}

                    <div className="col-lg-4">

                        <h3 className="fw-bold text-primary">

                            ShopSphere

                        </h3>

                        <p className="text-light mt-3">

                            ShopSphere is your trusted online shopping destination
                            offering quality products at the best prices.

                        </p>

                        <div className="d-flex gap-3 mt-4">

                            <a
                                href="#"
                                className="btn btn-outline-light rounded-circle"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="btn btn-outline-light rounded-circle"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="btn btn-outline-light rounded-circle"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                className="btn btn-outline-light rounded-circle"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="#"
                                className="btn btn-outline-light rounded-circle"
                            >
                                <FaYoutube />
                            </a>

                        </div>

                    </div>





                    {/* Quick Links */}

                    <div className="col-lg-2 col-md-6">

                        <h5 className="fw-bold">

                            Quick Links

                        </h5>

                        <ul className="list-unstyled mt-4">

                            <li className="mb-3">

                                <Link
                                    to="/home"
                                    className="text-decoration-none text-light"
                                >

                                    <FaArrowRight className="me-2" />

                                    Home

                                </Link>

                            </li>

                            <li className="mb-3">

                                <Link
                                    to="/products"
                                    className="text-decoration-none text-light"
                                >

                                    <FaArrowRight className="me-2" />

                                    Products

                                </Link>

                            </li>

                            <li className="mb-3">

                                <Link
                                    to="/categories"
                                    className="text-decoration-none text-light"
                                >

                                    <FaArrowRight className="me-2" />

                                    Categories

                                </Link>

                            </li>

                            <li>

                                <Link
                                    to="/orders"
                                    className="text-decoration-none text-light"
                                >

                                    <FaArrowRight className="me-2" />

                                    Orders

                                </Link>

                            </li>

                        </ul>

                    </div>





                    {/* Customer */}

                    <div className="col-lg-3 col-md-6">

                        <h5 className="fw-bold">

                            Customer Service

                        </h5>

                        <ul className="list-unstyled mt-4">

                            <li className="mb-3">Help Center</li>

                            <li className="mb-3">Return Policy</li>

                            <li className="mb-3">Privacy Policy</li>

                            <li>Terms & Conditions</li>

                        </ul>

                    </div>





                    {/* Contact */}

                    <div className="col-lg-3">

                        <h5 className="fw-bold">

                            Contact

                        </h5>

                        <div className="mt-4">

                            <p>

                                <FaMapMarkerAlt className="me-2 text-primary" />

                                Solapur, Maharashtra, India

                            </p>

                            <p>

                                <FaPhoneAlt className="me-2 text-primary" />

                                +91 9876543210

                            </p>

                            <p>

                                <FaEnvelope className="me-2 text-primary" />

                                support@shopsphere.com

                            </p>

                        </div>

                    </div>

                </div>

            </div>



            {/* Bottom */}

            <div className="bg-black py-3">

                <div className="container d-flex justify-content-between flex-column flex-md-row">

                    <span>

                        © {year} ShopSphere. All Rights Reserved.

                    </span>

                    <span>

                        Developed using React, Redux Toolkit & Bootstrap

                    </span>

                </div>

            </div>

        </footer>

    );

};

export default Footer;