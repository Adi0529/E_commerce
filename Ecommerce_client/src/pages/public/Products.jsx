import { useEffect, useMemo, useState } from "react";

import {

    Container,

    Row,

    Col,

    Card,

    Form,

    InputGroup

} from "react-bootstrap";

import {

    FaSearch,

    FaFilter

} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../redux/productSlice";

import { getCategories } from "../../redux/categorySlice";

import { getBrands } from "../../redux/brandSlice";

import ProductCard from "../../components/ProductCard";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

import Pagination from "../../components/Pagination";

const Products = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const {

        products,

        loading

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

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState(

    searchParams.get("category") || ""

);

    const [selectedBrand, setSelectedBrand] = useState(

    searchParams.get("brand") || ""

);

    const [priceRange, setPriceRange] = useState("");

    const [sortBy, setSortBy] = useState("latest");

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 8;

    useEffect(() => {

        dispatch(getAllProducts());

        dispatch(getCategories());

        dispatch(getBrands());

    }, [dispatch]);

    const filteredProducts = useMemo(() => {


        let data = [...products];



        // ================= SEARCH =================

        if (search) {

            data = data.filter((product) =>

                product.productName

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

            );

        }



        // ================= CATEGORY =================


        if (selectedCategory) {

            data = data.filter((product) =>

                product.category?._id === selectedCategory

            );

        }



        // ================= BRAND =================


        if (selectedBrand) {

            data = data.filter((product) =>

                product.brand?._id === selectedBrand

            );

        }




        // ================= PRICE =================


        if (priceRange === "0-50") {

            data = data.filter(

                product => product.price <= 50

            );

        }


        if (priceRange === "50-100") {

            data = data.filter(

                product =>

                    product.price >= 50 &&

                    product.price <= 100

            );

        }



        if (priceRange === "100-500") {

            data = data.filter(

                product =>

                    product.price >= 100 &&

                    product.price <= 500

            );

        }



        if (priceRange === "500+") {

            data = data.filter(

                product =>

                    product.price >= 500

            );

        }





        // ================= SORT =================



        if (sortBy === "low") {

            data.sort(

                (a, b) =>

                    a.price - b.price

            );

        }



        if (sortBy === "high") {

            data.sort(

                (a, b) =>

                    b.price - a.price

            );

        }



        if (sortBy === "rating") {

            data.sort(

                (a, b) =>

                    b.rating - a.rating

            );

        }



        if (sortBy === "latest") {

            data.sort(

                (a, b) =>

                    new Date(b.createdAt)

                    -

                    new Date(a.createdAt)

            );

        }



        return data;



    }, [

        products,

        search,

        selectedCategory,

        selectedBrand,

        priceRange,

        sortBy

    ]);

    return (

        <Container

            fluid

            className="py-4"

        >

            <Row>

                {/* ===========================
                        FILTER SIDEBAR
                ============================ */}

                <Col

                    lg={3}

                    className="mb-4"

                >

                    <Card

                        className="shadow-sm border-0 rounded-4"

                    >

                        <Card.Body>

                            <h4 className="fw-bold">

                                <FaFilter className="me-2" />

                                Filters

                            </h4>

                            <hr />

                            <Card.Body>

                                <h4 className="fw-bold">

                                    <FaFilter className="me-2" />

                                    Filters

                                </h4>

                                <hr />


                                {/* ================= CATEGORY FILTER ================= */}

                                <h6 className="fw-bold mb-3">

                                    Categories

                                </h6>


                                {

                                    categories.map((category) => (

                                        <Form.Check

                                            key={category._id}

                                            type="radio"

                                            label={category.categoryName}

                                            name="category"

                                            checked={
                                                selectedCategory === category._id
                                            }

                                            onChange={() => {

                                                setSelectedCategory(

                                                    category._id

                                                );

                                                setCurrentPage(1);

                                            }}

                                            className="mb-2"

                                        />

                                    ))

                                }



                                <hr />




                                {/* ================= BRAND FILTER ================= */}


                                <h6 className="fw-bold mb-3">

                                    Brands

                                </h6>


                                {

                                    brands.map((brand) => (

                                        <Form.Check

                                            key={brand._id}

                                            type="radio"

                                            label={brand.brandName}

                                            name="brand"

                                            checked={

                                                selectedBrand === brand._id

                                            }

                                            onChange={() => {

                                                setSelectedBrand(

                                                    brand._id

                                                );

                                                setCurrentPage(1);

                                            }}

                                            className="mb-2"

                                        />

                                    ))

                                }



                                <hr />





                                {/* ================= PRICE FILTER ================= */}



                                <h6 className="fw-bold mb-3">

                                    Price Range

                                </h6>


                                <Form.Check

                                    type="radio"

                                    label="$0 - $50"

                                    name="price"

                                    checked={priceRange === "0-50"}

                                    onChange={() => setPriceRange("0-50")}

                                    className="mb-2"

                                />


                                <Form.Check

                                    type="radio"

                                    label="$50 - $100"

                                    name="price"

                                    checked={priceRange === "50-100"}

                                    onChange={() => setPriceRange("50-100")}

                                    className="mb-2"

                                />


                                <Form.Check

                                    type="radio"

                                    label="$100 - $500"

                                    name="price"

                                    checked={priceRange === "100-500"}

                                    onChange={() => setPriceRange("100-500")}

                                    className="mb-2"

                                />



                                <Form.Check

                                    type="radio"

                                    label="$500+"

                                    name="price"

                                    checked={priceRange === "500+"}

                                    onChange={() => setPriceRange("500+")}

                                    className="mb-3"

                                />





                                {/* ================= CLEAR FILTER ================= */}



                                <button

                                    className="btn btn-danger w-100"

                                    onClick={() => {

                                        setSelectedCategory("");

                                        setSelectedBrand("");

                                        setPriceRange("");

                                        setSearch("");

                                        setSortBy("latest");

                                        setCurrentPage(1);

                                    }}

                                >

                                    Clear Filters

                                </button>


                            </Card.Body>

                        </Card.Body>

                    </Card>

                </Col>

                {/* ===========================
                        PRODUCTS
                ============================ */}

                <Col lg={9}>

                    <Row className="align-items-center mb-4">

                        <Col md={6}>

                            <InputGroup>

                                <InputGroup.Text>

                                    <FaSearch />

                                </InputGroup.Text>

                                <Form.Control

                                    placeholder="Search Products..."

                                    value={search}

                                    onChange={(e) =>

                                        setSearch(

                                            e.target.value

                                        )

                                    }

                                />

                            </InputGroup>

                        </Col>

                        <Col

                            md={3}

                            className="mt-3 mt-md-0"

                        >

                            <Form.Select

                                value={sortBy}

                                onChange={(e) =>

                                    setSortBy(

                                        e.target.value

                                    )

                                }

                            >

                                <option value="latest">

                                    Latest

                                </option>

                                <option value="low">

                                    Price Low → High

                                </option>

                                <option value="high">

                                    Price High → Low

                                </option>

                                <option value="rating">

                                    Rating

                                </option>

                            </Form.Select>

                        </Col>

                        <Col

                            md={3}

                            className="text-md-end mt-3 mt-md-0"

                        >

                            <span className="fw-bold">

                                {

                                    filteredProducts.length

                                }

                                {" "}Products

                            </span>

                        </Col>

                    </Row>

                    {/* ===========================
        PRODUCTS GRID
============================ */}


                    {

                        loading ?

                            (

                                <Loader />

                            )

                            :

                            filteredProducts.length === 0 ?

                                (

                                    <EmptyState

                                        title="No Products Found"

                                        description="Try changing your filters or search."

                                    />

                                )

                                :

                                (

                                    <Row className="g-4">


                                        {

                                            filteredProducts

                                                .slice(

                                                    (currentPage - 1) * productsPerPage,

                                                    currentPage * productsPerPage

                                                )

                                                .map((product) => (


                                                    <Col

                                                        key={product._id}

                                                        lg={4}

                                                        md={6}

                                                        sm={6}

                                                        xs={12}

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



                    {/* ===========================
        PAGINATION
============================ */}


                    <div className="mt-5">


                        <Pagination

                            currentPage={currentPage}

                            totalPages={

                                Math.ceil(

                                    filteredProducts.length /

                                    productsPerPage

                                )

                            }

                            onPageChange={setCurrentPage}

                        />


                    </div>

                </Col>

            </Row>

        </Container>

    );

};

export default Products;