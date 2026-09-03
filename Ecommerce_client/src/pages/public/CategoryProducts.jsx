import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { getAllProducts } from "../../redux/productSlice";
import { getCategoryById } from "../../redux/categorySlice";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import ProductCard from "../../components/ProductCard";

const CategoryProducts = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {
        products,
        loading
    } = useSelector(state => state.product);

    const {
        category
    } = useSelector(state => state.category);

    useEffect(() => {

        dispatch(getAllProducts());

        dispatch(getCategoryById(id));

    }, [dispatch, id]);

    const categoryProducts = products.filter(
        product =>
            product.category?._id === id ||
            product.category === id
    );

    if (loading) {
        return <Loader />;
    }

    return (

        <Container className="py-5">

            <div className="mb-5 text-center">

                <h2 className="fw-bold">

                    {category?.categoryName || "Category Products"}

                </h2>

                <p className="text-muted">

                    {category?.description}

                </p>

            </div>

            {

                categoryProducts.length === 0 ?

                (

                    <EmptyState
                        title="No Products Found"
                        description="There are no products in this category."
                    />

                )

                :

                (

                    <Row className="g-4">

                        {

                            categoryProducts.map(product => (

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

export default CategoryProducts;