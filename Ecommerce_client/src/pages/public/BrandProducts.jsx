import { useEffect } from "react";

import {

    Container,

    Row,

    Col,

    Card,

    Button

} from "react-bootstrap";

import {

    FaStore

} from "react-icons/fa";

import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    useNavigate,

    useParams

} from "react-router-dom";

import {

    getBrandsByCategory

} from "../../redux/brandSlice";

import {

    getCategories

} from "../../redux/categorySlice";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

const BrandProducts = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        brands,

        loading

    } = useSelector(

        state => state.brand

    );

    const {

        categories

    } = useSelector(

        state => state.category

    );

    useEffect(() => {

        dispatch(

            getBrandsByCategory(id)

        );

        dispatch(

            getCategories()

        );

    }, [

        dispatch,

        id

    ]);

    const category = categories.find(

        item => item._id === id

    );

    return (

        <Container className="py-5">

            <div className="mb-5">

                <h2 className="fw-bold">

                    <FaStore className="me-2 text-primary"/>

                    {

                        category

                        ?

                        category.categoryName

                        :

                        "Category"

                    }

                    {" "}Brands

                </h2>

                <p className="text-muted">

                    Select your favourite brand.

                </p>

            </div>

            {
    loading ?

    (

        <Loader/>

    )

    :

    brands.length === 0 ?

    (

        <EmptyState

            title="No Brands Available"

            description="Admin has not added brands yet."

        />

    )

    :

    (

        <Row className="g-4">

            {

                brands.map((brand)=>(

                    <Col

                        lg={3}

                        md={4}

                        sm={6}

                        xs={12}

                        key={brand._id}

                    >

                        <Card

                            className="shadow border-0 rounded-4 h-100"

                            style={{

                                cursor:"pointer",

                                transition:".3s"

                            }}

                        >

                            <Card.Img

                                variant="top"

                                src={`https://e-commerce-2-u41a.onrender.com/${brand.brandLogo}`}

                                style={{

                                    height:"220px",

                                    objectFit:"contain",

                                    padding:"20px"

                                }}

                            />

                            <Card.Body className="text-center">

                                <h5 className="fw-bold">

                                    {brand.brandName}

                                </h5>

                                <Button

                                    className="w-100 mt-3"

                                    onClick={()=>{

                                        navigate(

                                            `/products?category=${id}&brand=${brand._id}`

                                        );

                                    }}

                                >

                                    View Products

                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>

                ))

            }

        </Row>

    )
}

        </Container>

    );

};

export default BrandProducts;