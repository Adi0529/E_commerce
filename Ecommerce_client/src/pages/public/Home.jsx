import { useEffect } from "react";

import {

    Container,

    Row,

    Col,

    Carousel,

    Button,

    Card

} from "react-bootstrap";

import {

    FaArrowRight,

    FaShippingFast,

    FaShieldAlt,

    FaHeadset,

    FaUndoAlt

} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {

    getCategories

} from "../../redux/categorySlice";

import {

    getBrands 

} from "../../redux/brandSlice";

import {

    getAllProducts

} from "../../redux/productSlice";

import CategoryCard from "../../components/CategoryCard";

import BrandCard from "../../components/BrandCard";

import ProductCarousel from "../../components/ProductCarousel";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";

const Home = () => {

    const dispatch = useDispatch();

    const {

        categories,

        loading: categoryLoading

    } = useSelector(

        state => state.category

    );

    const {

        brands,

        loading: brandLoading

    } = useSelector(

        state => state.brand

    );

    const {

        products,

        loading: productLoading

    } = useSelector(

        state => state.product

    );

    useEffect(() => {

        dispatch(getCategories());

        dispatch(getBrands());

        dispatch(getAllProducts());

    }, [dispatch]);

    const featuredProducts =

        products.slice(0, 8);

    const latestProducts =

        [...products]

            .reverse()

            .slice(0, 8);

    const bestSelling =

        [...products]

            .sort(

                (a, b) =>

                    b.totalReviews -

                    a.totalReviews

            )

            .slice(0, 8);

    return (

        <>

            {/* ===========================================
                        HERO SLIDER
            ============================================ */}

            <Carousel fade>

                <Carousel.Item>

                    <img

                        src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"

                        className="d-block w-100"

                        style={{

                            height: "550px",

                            objectFit: "cover"

                        }}

                        alt=""

                    />

                    <Carousel.Caption

                        className="text-start"

                        style={{

                            bottom: "120px"

                        }}

                    >

                        <h1 className="display-3 fw-bold ">

                            Latest Electronics

                        </h1>

                        <p className="fs-4 ">

                            Up To 50% OFF

                        </p>

                        <Link

                            to="/products"

                            className="btn btn-warning btn-lg"

                        >

                            Shop Now

                            <FaArrowRight className="ms-2"/>

                        </Link>

                    </Carousel.Caption>

                </Carousel.Item>

                <Carousel.Item>

                    <img

                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"

                        className="d-block w-100"

                        style={{

                            height: "550px",

                            objectFit: "cover"

                        }}

                        alt=""

                    />

                    <Carousel.Caption

                        className="text-start"

                        style={{

                            bottom: "120px"

                        }}

                    >

                        <h1 className="display-3 fw-bold">

                            Fashion Collection

                        </h1>

                        <p className="fs-4">

                            New Season Arrivals

                        </p>

                        <Link

                            to="/products"

                            className="btn btn-primary btn-lg"

                        >

                            Explore

                        </Link>

                    </Carousel.Caption>

                </Carousel.Item>

                <Carousel.Item>

                    <img

                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"

                        className="d-block w-100"

                        style={{

                            height: "550px",

                            objectFit: "cover"

                        }}

                        alt=""

                    />

                    <Carousel.Caption

                        className="text-start"

                        style={{

                            bottom: "120px"

                        }}

                    >

                        <h1 className="display-3 fw-bold">

                            Smart Gadgets

                        </h1>

                        <p className="fs-4">

                            Trending Products

                        </p>

                        <Button

                            size="lg"

                            variant="success"

                        >

                            Buy Now

                        </Button>

                    </Carousel.Caption>

                </Carousel.Item>

            </Carousel>

            {/* ===========================================
                    CATEGORY SECTION
            ============================================ */}

            <Container className="py-5">

                <div className="d-flex justify-content-between align-items-center">

                    <h2 className="fw-bold">

                        Shop By Category

                    </h2>

                    <Link

                        className="btn btn-outline-primary"

                        to="/categories"

                    >

                        View All

                    </Link>

                </div>

                {

                    categoryLoading ?

                    (

                        <Loader/>

                    )

                    :

                    categories.length===0 ?

                    (

                        <EmptyState

                            title="No Categories"

                            description="Categories not available."

                        />

                    )

                    :

                    (

                        <Row className="mt-4 g-4">

                            {

                                categories.map(category=>(

                                    <Col

                                        lg={3}

                                        md={4}

                                        sm={6}

                                        xs={12}

                                        key={category._id}

                                    >

                                        <CategoryCard

                                            category={category}

                                        />

                                    </Col>

                                ))

                            }

                        </Row>

                    )

                }

            </Container>
                        {/* ===========================================
                    TOP BRANDS
            ============================================ */}

            <Container className="py-5">

                <div className="d-flex justify-content-between align-items-center">

                    <h2 className="fw-bold">

                        Popular Brands

                    </h2>

                    <Link
                        to="/brands"
                        className="btn btn-outline-dark"
                    >

                        View All

                    </Link>

                </div>

                {

                    brandLoading ?

                    (

                        <Loader />

                    )

                    :

                    brands.length === 0 ?

                    (

                        <EmptyState

                            title="No Brands Available"

                            description="Brands will appear here."

                        />

                    )

                    :

                    (

                        <Row className="g-4 mt-3">

                            {

                                brands.map((brand)=>(

                                    <Col

                                        lg={2}

                                        md={3}

                                        sm={4}

                                        xs={6}

                                        key={brand._id}

                                    >

                                        <BrandCard

                                            brand={brand}

                                        />

                                    </Col>

                                ))

                            }

                        </Row>

                    )

                }

            </Container>





            {/* ===========================================
                    FEATURED PRODUCTS
            ============================================ */}

            <Container fluid className="bg-light py-5">

                <Container>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold mb-1">

                                Featured Products

                            </h2>

                            <small className="text-muted">

                                Handpicked products for you

                            </small>

                        </div>

                    </div>

                    {

                        productLoading ?

                        (

                            <Loader/>

                        )

                        :

                        featuredProducts.length === 0 ?

                        (

                            <EmptyState

                                title="Products Not Available"

                            />

                        )

                        :

                        (

                            <ProductCarousel

                                title="Featured Products"

                                products={featuredProducts}

                            />

                        )

                    }

                </Container>

            </Container>





            {/* ===========================================
                    NEW ARRIVALS
            ============================================ */}

            <Container className="py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            New Arrivals

                        </h2>

                        <small className="text-muted">

                            Freshly added products

                        </small>

                    </div>

                </div>

                {

                    productLoading ?

                    (

                        <Loader/>

                    )

                    :

                    latestProducts.length===0 ?

                    (

                        <EmptyState

                            title="No New Products"

                        />

                    )

                    :

                    (

                        <ProductCarousel

                            title="New Arrivals"

                            products={latestProducts}

                        />

                    )

                }

            </Container>





            {/* ===========================================
                    BEST SELLERS
            ============================================ */}

            <Container fluid className="bg-light py-5">

                <Container>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold">

                                Best Sellers

                            </h2>

                            <small className="text-muted">

                                Most loved products

                            </small>

                        </div>

                    </div>

                    {

                        productLoading ?

                        (

                            <Loader/>

                        )

                        :

                        bestSelling.length===0 ?

                        (

                            <EmptyState

                                title="No Products"

                            />

                        )

                        :

                        (

                            <ProductCarousel

                                title="Best Sellers"

                                products={bestSelling}

                            />

                        )

                    }

                </Container>

            </Container>





            {/* ===========================================
                    PROMOTION BANNER
            ============================================ */}

            <Container className="my-5">

                <Row
                    className="rounded-4 overflow-hidden align-items-center"
                    style={{
                        background:
                        "linear-gradient(90deg,#0d6efd,#6610f2)"
                    }}
                >

                    <Col lg={7} className="text-white p-5">

                        <h1 className="fw-bold display-5">

                            Mega Sale

                        </h1>

                        <h3 className="mb-4">

                            Up To 70% OFF

                        </h3>

                        <p className="fs-5">

                            Grab the hottest deals before they're gone.

                        </p>

                        <Link
                            to="/products"
                            className="btn btn-warning btn-lg mt-2"
                        >

                            Shop Deals

                        </Link>

                    </Col>

                    <Col
                        lg={5}
                        className="text-center"
                    >

                        <img

                            src="https://images.unsplash.com/photo-1498049794561-7780e7231661"

                            className="img-fluid"

                            style={{

                                maxHeight:"350px",

                                objectFit:"cover"

                            }}

                            alt=""

                        />

                    </Col>

                </Row>

            </Container>
                        {/* ===========================================
                    TRENDING PRODUCTS
            ============================================ */}

            <Container className="py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            Trending Products

                        </h2>

                        <small className="text-muted">

                            Most popular products this week

                        </small>

                    </div>

                    <Link

                        to="/products"

                        className="btn btn-outline-primary"

                    >

                        View All

                    </Link>

                </div>

                {

                    productLoading ?

                    (

                        <Loader />

                    )

                    :

                    products.length === 0 ?

                    (

                        <EmptyState

                            title="Products Not Available"

                        />

                    )

                    :

                    (

                        <Row className="g-4">

                            {

                                products

                                    .slice(0, 8)

                                    .map((product) => (

                                        <Col

                                            lg={3}

                                            md={4}

                                            sm={6}

                                            xs={12}

                                            key={product._id}

                                        >

                                            <ProductCard

                                                product={product}

                                            />

                                        </Col>

                                    ))

                            }

                        </Row>

                    )

                }

            </Container>





            {/* ===========================================
                    WHY CHOOSE US
            ============================================ */}

            <Container fluid className="bg-light py-5">

                <Container>

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">

                            Why Shop With Us?

                        </h2>

                        <p className="text-muted">

                            Everything you need with trusted service.

                        </p>

                    </div>

                    <Row className="g-4">

                        <Col lg={3} md={6}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100 p-4"

                            >

                                <FaShippingFast

                                    size={45}

                                    className="text-primary mx-auto"

                                />

                                <h5 className="fw-bold mt-3">

                                    Fast Delivery

                                </h5>

                                <p className="text-muted">

                                    Quick shipping across the country.

                                </p>

                            </Card>

                        </Col>

                        <Col lg={3} md={6}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100 p-4"

                            >

                                <FaShieldAlt

                                    size={45}

                                    className="text-success mx-auto"

                                />

                                <h5 className="fw-bold mt-3">

                                    Secure Payment

                                </h5>

                                <p className="text-muted">

                                    100% safe and encrypted checkout.

                                </p>

                            </Card>

                        </Col>

                        <Col lg={3} md={6}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100 p-4"

                            >

                                <FaUndoAlt

                                    size={45}

                                    className="text-danger mx-auto"

                                />

                                <h5 className="fw-bold mt-3">

                                    Easy Returns

                                </h5>

                                <p className="text-muted">

                                    Hassle-free replacement and returns.

                                </p>

                            </Card>

                        </Col>

                        <Col lg={3} md={6}>

                            <Card

                                className="border-0 shadow-sm rounded-4 text-center h-100 p-4"

                            >

                                <FaHeadset

                                    size={45}

                                    className="text-warning mx-auto"

                                />

                                <h5 className="fw-bold mt-3">

                                    24 × 7 Support

                                </h5>

                                <p className="text-muted">

                                    Dedicated customer support anytime.

                                </p>

                            </Card>

                        </Col>

                    </Row>

                </Container>

            </Container>





            {/* ===========================================
                    NEWSLETTER
            ============================================ */}

            <Container className="py-5">

                <Row className="justify-content-center">

                    <Col lg={8}>

                        <Card

                            className="border-0 shadow rounded-4 p-5"

                        >

                            <div className="text-center">

                                <h2 className="fw-bold">

                                    Subscribe To Our Newsletter

                                </h2>

                                <p className="text-muted">

                                    Receive offers, discounts and new arrivals directly in your inbox.

                                </p>

                            </div>

                            <div className="input-group mt-4">

                                <input

                                    type="email"

                                    className="form-control form-control-lg"

                                    placeholder="Enter your email"

                                />

                                <button

                                    className="btn btn-primary btn-lg"

                                >

                                    Subscribe

                                </button>

                            </div>

                        </Card>

                    </Col>

                </Row>

            </Container>





            {/* ===========================================
                    FOOTER
            ============================================ */}

            <footer className="bg-dark text-white pt-5">

                <Container>

                    <Row className="g-4">

                        <Col lg={4}>

                            <h3 className="fw-bold">

                                E-Commerce

                            </h3>

                            <p className="text-light mt-3">

                                A modern shopping platform with secure payments, fast delivery and premium products.

                            </p>

                        </Col>

                        <Col lg={2}>

                            <h5>

                                Shop

                            </h5>

                            <ul className="list-unstyled mt-3">

                                <li>

                                    <Link

                                        className="text-white text-decoration-none"

                                        to="/products"

                                    >

                                        Products

                                    </Link>

                                </li>

                                <li className="mt-2">

                                    <Link

                                        className="text-white text-decoration-none"

                                        to="/categories"

                                    >

                                        Categories

                                    </Link>

                                </li>

                                <li className="mt-2">

                                    <Link

                                        className="text-white text-decoration-none"

                                        to="/orders"

                                    >

                                        Orders

                                    </Link>

                                </li>

                            </ul>

                        </Col>

                        <Col lg={3}>

                            <h5>

                                Account

                            </h5>

                            <ul className="list-unstyled mt-3">

                                <li>

                                    <Link

                                        to="/profile"

                                        className="text-white text-decoration-none"

                                    >

                                        My Profile

                                    </Link>

                                </li>

                                <li className="mt-2">

                                    <Link

                                        to="/cart"

                                        className="text-white text-decoration-none"

                                    >

                                        Cart

                                    </Link>

                                </li>

                                <li className="mt-2">

                                    <Link

                                        to="/orders"

                                        className="text-white text-decoration-none"

                                    >

                                        My Orders

                                    </Link>

                                </li>

                            </ul>

                        </Col>

                        <Col lg={3}>

                            <h5>

                                Contact

                            </h5>

                            <p className="mt-3 mb-1">

                                support@ecommerce.com

                            </p>

                            <p>

                                +91 9876543210

                            </p>

                        </Col>

                    </Row>

                    <hr className="border-secondary mt-5" />

                    <div className="text-center pb-4">

                        © {new Date().getFullYear()} E-Commerce. All Rights Reserved.

                    </div>

                </Container>

            </footer>

        </>

    );

};

export default Home;