import { useEffect, useMemo, useState } from "react";

import {

    Container,

    Row,

    Col,

    Form,

    InputGroup,

    Card

} from "react-bootstrap";

import {

    FaSearch,

    FaFilter

} from "react-icons/fa";

import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    getAllProducts

} from "../../redux/productSlice";

import {

    getCategories

} from "../../redux/categorySlice";

import {

    getBrands

} from "../../redux/brandSlice";

import ProductCard from "../../components/ProductCard";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

import Pagination from "../../components/Pagination";

const Search = () => {

    const dispatch = useDispatch();

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

    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("");

    const [brand, setBrand] = useState("");

    const [sort, setSort] = useState("latest");

    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 8;

    useEffect(() => {

        dispatch(getAllProducts());

        dispatch(getCategories());

        dispatch(getBrands());

    }, [dispatch]);

    const filteredProducts = useMemo(() => {

        let data = [...products];

        if (keyword) {

            data = data.filter(

                item =>

                    item.productName

                        .toLowerCase()

                        .includes(

                            keyword.toLowerCase()

                        )

            );

        }

        if (category) {

            data = data.filter(

                item =>

                    item.category?._id === category

            );

        }

        if (brand) {

            data = data.filter(

                item =>

                    item.brand?._id === brand

            );

        }

        if (sort === "low") {

            data.sort(

                (a, b) => a.price - b.price

            );

        }

        if (sort === "high") {

            data.sort(

                (a, b) => b.price - a.price

            );

        }

        if (sort === "rating") {

            data.sort(

                (a, b) => b.rating - a.rating

            );

        }

        if (sort === "latest") {

            data.sort(

                (a, b) =>

                    new Date(b.createdAt) -

                    new Date(a.createdAt)

            );

        }

        return data;

    }, [

        products,

        keyword,

        category,

        brand,

        sort

    ]);

    return (

        <Container className="py-5">

            <Row>

                {/* Sidebar */}

                <Col lg={3}>

                    <Card className="shadow border-0 rounded-4">

                        <Card.Body>

                            <h4>

                                <FaFilter className="me-2" />

                                Filters

                            </h4>

                            <hr />

                            <h6 className="fw-bold">

                                Categories

                            </h6>

                            <Form.Select

                                className="mb-3"

                                value={category}

                                onChange={(e) => {

                                    setCategory(e.target.value);

                                    setCurrentPage(1);

                                }}

                            >

                                <option value="">

                                    All Categories

                                </option>

                                {

                                    categories.map((item) => (

                                        <option

                                            key={item._id}

                                            value={item._id}

                                        >

                                            {item.categoryName}

                                        </option>

                                    ))

                                }

                            </Form.Select>





                            <h6 className="fw-bold">

                                Brands

                            </h6>

                            <Form.Select

                                className="mb-3"

                                value={brand}

                                onChange={(e) => {

                                    setBrand(e.target.value);

                                    setCurrentPage(1);

                                }}

                            >

                                <option value="">

                                    All Brands

                                </option>

                                {

                                    brands.map((item) => (

                                        <option

                                            key={item._id}

                                            value={item._id}

                                        >

                                            {item.brandName}

                                        </option>

                                    ))

                                }

                            </Form.Select>





                            <h6 className="fw-bold">

                                Sort

                            </h6>

                            <Form.Select

                                value={sort}

                                onChange={(e) =>

                                    setSort(

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

                                    Highest Rating

                                </option>

                            </Form.Select>

                        </Card.Body>

                    </Card>

                </Col>

                {/* Products */}

                <Col lg={9}>

                    <InputGroup className="mb-4">

                        <InputGroup.Text>

                            <FaSearch />

                        </InputGroup.Text>

                        <Form.Control

                            placeholder="Search Products..."

                            value={keyword}

                            onChange={(e) => {

                                setKeyword(

                                    e.target.value

                                );

                                setCurrentPage(1);

                            }}

                        />

                    </InputGroup>

                    {

                        loading

                            ?

                            <Loader />

                            :

                            filteredProducts.length === 0

                                ?

                                <EmptyState

                                    title="No Products Found"

                                />

                                :

                                <>

                                    <Row className="g-4">

                                        {

                                            filteredProducts

                                                .slice(

                                                    (currentPage - 1) * perPage,

                                                    currentPage * perPage

                                                )

                                                .map((product) => (

                                                    <Col

                                                        lg={4}

                                                        md={6}

                                                        key={product._id}

                                                    >

                                                        <ProductCard

                                                            product={product}

                                                        />

                                                    </Col>

                                                ))

                                        }

                                    </Row>

                                    <div className="mt-5">

                                        <Pagination

                                            currentPage={currentPage}

                                            totalPages={Math.ceil(filteredProducts.length / perPage)}

                                            onPageChange={setCurrentPage}

                                        />

                                    </div>

                                </>

                    }

                </Col>

            </Row>

        </Container>

    );

};

export default Search;