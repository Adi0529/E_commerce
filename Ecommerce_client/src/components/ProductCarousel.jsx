import { useMemo } from "react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ products = [], title }) => {

    const chunkSize = 4;

    const productGroups = useMemo(() => {

        const groups = [];

        for (let i = 0; i < products.length; i += chunkSize) {

            groups.push(products.slice(i, i + chunkSize));

        }

        return groups;

    }, [products]);

    if (!products.length) {

        return null;

    }

    return (

        <div className="container my-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3 className="fw-bold">

                    {title}

                </h3>

            </div>

            <div

                id={`carousel-${title.replace(/\s+/g, "")}`}

                className="carousel slide"

                data-bs-ride="carousel"

            >

                <div className="carousel-inner">

                    {

                        productGroups.map((group, index) => (

                            <div

                                className={`carousel-item ${index === 0 ? "active" : ""}`}

                                key={index}

                            >

                                <div className="row g-4">

                                    {

                                        group.map((product) => (

                                            <div

                                                className="col-lg-3 col-md-6"

                                                key={product._id}

                                            >

                                                <ProductCard

                                                    product={product}

                                                />

                                            </div>

                                        ))

                                    }

                                </div>

                            </div>

                        ))

                    }

                </div>

                {

                    productGroups.length > 1 && (

                        <>

                            <button

                                className="carousel-control-prev"

                                type="button"

                                data-bs-target={`#carousel-${title.replace(/\s+/g, "")}`}

                                data-bs-slide="prev"

                            >

                                <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>

                            </button>

                            <button

                                className="carousel-control-next"

                                type="button"

                                data-bs-target={`#carousel-${title.replace(/\s+/g, "")}`}

                                data-bs-slide="next"

                            >

                                <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>

                            </button>

                        </>

                    )

                }

            </div>

        </div>

    );

};

export default ProductCarousel;