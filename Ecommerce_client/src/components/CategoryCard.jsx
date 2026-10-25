import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({ category }) => {

    return (

        <Link
            to={`/category/${category._id}`}
            className="text-decoration-none"
        >

            <Card
                className="border-0 shadow rounded-4 h-100 overflow-hidden"
                style={{
                    transition: "0.3s",
                    cursor: "pointer"
                }}
            >

                <div
                    style={{
                        height: "180px",
                        overflow: "hidden"
                    }}
                >

                    <Card.Img
                        src={`https://e-commerce-2-u41a.onrender.com/uploads/products/category/${category.categoryImage}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />

                </div>

                <Card.Body className="text-center">

                    <h5 className="fw-bold">

                        {category.categoryName}

                    </h5>

                    <p
                        className="text-muted"
                        style={{
                            minHeight: "45px"
                        }}
                    >

                        {category.description}

                    </p>

                    <button className="btn btn-primary rounded-pill px-4">

                        Explore

                        <FaArrowRight className="ms-2" />

                    </button>

                </Card.Body>

            </Card>

        </Link>

    );

};

export default CategoryCard;