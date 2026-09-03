import { useEffect, useMemo, useState } from "react";

import {

    Container,

    Row,

    Col,

    Form,

    InputGroup,

    Card,

    Button

} from "react-bootstrap";

import {

    FaSearch,

    FaThLarge

} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { getCategories } from "../../redux/categorySlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

import Pagination from "../../components/Pagination";

const Categories = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        categories,

        loading

    } = useSelector(

        state => state.category

    );

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    useEffect(() => {

        dispatch(getCategories());

    }, [dispatch]);

    const filteredCategories = useMemo(() => {

        return categories.filter((category) =>

            category.categoryName

                .toLowerCase()

                .includes(search.toLowerCase())

        );

    }, [

        categories,

        search

    ]);

    return (

        <Container className="py-5">

            {/* ================= HEADER ================= */}

            <Row className="mb-5 align-items-center">

                <Col lg={6}>

                    <h2 className="fw-bold">

                        <FaThLarge className="me-2 text-primary"/>

                        Shop By Categories

                    </h2>

                    <p className="text-muted">

                        Browse products by category.

                    </p>

                </Col>

                <Col lg={6}>

                    <InputGroup>

                        <InputGroup.Text>

                            <FaSearch/>

                        </InputGroup.Text>

                        <Form.Control

                            placeholder="Search Category..."

                            value={search}

                            onChange={(e)=>{

                                setSearch(

                                    e.target.value

                                );

                                setCurrentPage(1);

                            }}

                        />

                    </InputGroup>

                </Col>

            </Row>

            {
    loading ? (

        <Loader />

    ) : filteredCategories.length === 0 ? (

        <EmptyState
            title="No Categories Found"
            description="Try another search."
        />

    ) : (

        <>
            <Row className="g-4">

                {
                    filteredCategories
                        .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                        )
                        .map((category) => (

                            <Col
                                lg={3}
                                md={4}
                                sm={6}
                                xs={12}
                                key={category._id}
                            >

                                <Card
                                    className="shadow border-0 rounded-4 h-100"
                                    style={{
                                        cursor: "pointer",
                                        transition: ".3s"
                                    }}
                                >

                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:5006/uploads/products/category/${category.categoryImage}`}
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <Card.Body className="text-center">

                                        <h5 className="fw-bold">

                                            {category.categoryName}

                                        </h5>

                                        <p className="text-muted">

                                            {category.description}

                                        </p>

                                        <Button
                                            variant="primary"
                                            className="w-100"
                                            onClick={() =>
                                                navigate(
                                                    `/category/${category._id}`
                                                )
                                            }
                                        >

                                            Explore

                                        </Button>

                                    </Card.Body>

                                </Card>

                            </Col>

                        ))
                }

            </Row>

            <div className="mt-5">

                <Pagination
                    currentPage={currentPage}
                    totalPages={
                        Math.ceil(
                            filteredCategories.length /
                            itemsPerPage
                        )
                    }
                    onPageChange={setCurrentPage}
                />

            </div>
        </>
    )
}

        </Container>

    );

};

export default Categories;