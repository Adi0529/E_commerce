import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { getAllProducts } from "../../redux/productSlice";
import { getBrandById } from "../../redux/brandSlice";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";

const ProductByBrand = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {
        products,
        loading
    } = useSelector(state => state.product);

    const {
        brand
    } = useSelector(state => state.brand);

    useEffect(() => {

        dispatch(getAllProducts());

        dispatch(getBrandById(id));

    }, [dispatch, id]);

    const brandProducts = products.filter(product =>
        product.brand?._id === id ||
        product.brand === id
    );

    if (loading) {

        return <Loader />;

    }

    return (

        <Container className="py-5">

            <div className="text-center mb-5">

                <img
                    src={`https://e-commerce-2-u41a.onrender.com/uploads/products/brand/${brand?.brandLogo}`}
                    alt=""
                    style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "contain"
                    }}
                />

                <h2 className="fw-bold mt-3">

                    {brand?.brandName}

                </h2>

                <p className="text-muted">

                    {brand?.categoryId?.categoryName ||
                        brand?.category?.categoryName}

                </p>

            </div>

            {

                brandProducts.length === 0 ?

                    (

                        <EmptyState
                            title="No Products Found"
                            description="There are no products available for this brand."
                        />

                    )

                    :

                    (

                        <Row className="g-4">

                            {

                                brandProducts.map(product => (

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

    );

};

export default ProductByBrand;