import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BrandCard = ({ brand }) => {
    const location = useLocation();

    const prefix =
        location.pathname.startsWith("/admin")
            ? "/admin"
            : location.pathname.startsWith("/vendor")
                ? "/vendor"
                : "";


    return (

        <Link
            to={`${prefix}/brand/${brand._id}`}
            className="text-decoration-none"
        >

            <Card
                className="border-0 shadow-sm rounded-4 text-center h-100 p-3"
                style={{
                    transition: ".3s",
                    cursor: "pointer"
                }}
            >

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        height: "120px"
                    }}
                >

                    <img

                        src={`http://localhost:5006/uploads/products/brand/${brand.brandLogo}`}

                        alt=""

                        style={{

                            width: "90px",

                            height: "90px",

                            objectFit: "contain"

                        }}

                    />

                </div>

                <h5 className="fw-bold mt-3">

                    {brand.brandName}

                </h5>

                <small className="text-muted">

                    {brand.category?.categoryName}

                </small>

            </Card>

        </Link>

    );

};

export default BrandCard;