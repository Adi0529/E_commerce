import { useEffect, useState } from "react";

import {
    Card,
    Container,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getProductById,
    updateProduct
} from "../../redux/productSlice";

import {
    getCategories
} from "../../redux/categorySlice";

import {
    getBrandsByCategory
} from "../../redux/brandSlice";

import Loader from "../../components/Loader";
const EditProduct = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const {

        product,

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
    const [form, setForm] = useState({

        productName: "",

        description: "",

        category: "",

        brand: "",

        price: "",

        discountPrice: "",

        stock: "",

        thumbnail: null,

        images: [],

        specifications: "{}"

    });
    useEffect(() => {

        dispatch(

            getProductById(id)

        );

        dispatch(

            getCategories()

        );

    }, [dispatch, id]);
    useEffect(() => {

        if (product) {

            setForm({

                productName: product.productName,

                description: product.description,

                category: product.category._id,

                brand: product.brand._id,

                price: product.price,

                discountPrice: product.discountPrice,

                stock: product.stock,

                thumbnail: null,

                images: [],

                specifications: JSON.stringify(

                    product.specifications,

                    null,

                    2

                )

            });

            dispatch(

                getBrandsByCategory(

                    product.category._id

                )

            );

        }

    }, [product, dispatch]);
    const handleChange = (e) => {

        const {

            name,

            value,

            files

        } = e.target;

        if (name === "thumbnail") {

            setForm({

                ...form,

                thumbnail: files[0]

            });

        }

        else if (name === "images") {

            setForm({

                ...form,

                images: files

            });

        }

        else {

            setForm({

                ...form,

                [name]: value

            });

        }

    };
    const handleCategory = (e) => {

        const value = e.target.value;

        setForm({

            ...form,

            category: value,

            brand: ""

        });

        dispatch(

            getBrandsByCategory(value)

        );

    };
    const handleSubmit = (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(form).forEach(key => {

            if (

                key !== "images"

            )

                data.append(

                    key,

                    form[key]

                );

        });

        Array.from(

            form.images

        ).forEach(image => {

            data.append(

                "images",

                image

            );

        });

        dispatch(

            updateProduct({

                id,

                formData: data

            })

        );

        navigate(

            "/vendor/my-products"

        );

    };
    if (loading)

        return <Loader />;
    return (

        <Container className="py-4">

            <Card className="shadow border-0 rounded-4">

                <Card.Body>

                    <h3 className="fw-bold mb-4">

                        Edit Product

                    </h3>

                    <Form

                        onSubmit={handleSubmit}

                    >

                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Product Name

                                    </Form.Label>

                                    <Form.Control

                                        name="productName"

                                        value={form.productName}

                                        onChange={handleChange}

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Category

                                    </Form.Label>

                                    <Form.Select

                                        value={form.category}

                                        onChange={handleCategory}

                                    >

                                        <option>

                                            Select

                                        </option>

                                        {

                                            categories.map(category => (

                                                <option

                                                    key={category._id}

                                                    value={category._id}

                                                >

                                                    {category.categoryName}

                                                </option>

                                            ))

                                        }

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Brand

                                    </Form.Label>

                                    <Form.Select

                                        name="brand"

                                        value={form.brand}

                                        onChange={handleChange}

                                    >

                                        <option>

                                            Select

                                        </option>

                                        {

                                            brands.map(brand => (

                                                <option

                                                    key={brand._id}

                                                    value={brand._id}

                                                >

                                                    {brand.brandName}

                                                </option>

                                            ))

                                        }

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Price

                                    </Form.Label>

                                    <Form.Control

                                        type="number"

                                        name="price"

                                        value={form.price}

                                        onChange={handleChange}

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={12}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Description

                                    </Form.Label>

                                    <Form.Control

                                        as="textarea"

                                        rows={4}

                                        name="description"

                                        value={form.description}

                                        onChange={handleChange}

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={4}>

                                <Form.Control

                                    type="number"

                                    placeholder="Discount Price"

                                    name="discountPrice"

                                    value={form.discountPrice}

                                    onChange={handleChange}

                                />

                            </Col>

                            <Col md={4}>

                                <Form.Control

                                    type="number"

                                    placeholder="Stock"

                                    name="stock"

                                    value={form.stock}

                                    onChange={handleChange}

                                />

                            </Col>

                            <Col md={4}>

                                <Form.Control

                                    type="file"

                                    name="thumbnail"

                                    onChange={handleChange}

                                />

                            </Col>

                            <Col md={12} className="mt-3">

                                <Form.Control

                                    type="file"

                                    multiple

                                    name="images"

                                    onChange={handleChange}

                                />

                            </Col>

                            <Col md={12} className="mt-3">

                                <Form.Control

                                    as="textarea"

                                    rows={6}

                                    name="specifications"

                                    value={form.specifications}

                                    onChange={handleChange}

                                />

                            </Col>

                            <Col md={12} className="mt-4">

                                <Button

                                    type="submit"

                                    size="lg"

                                    className="w-100"

                                >

                                    Update Product

                                </Button>

                            </Col>

                        </Row>

                    </Form>

                </Card.Body>

            </Card>

        </Container>

    );

};

export default EditProduct;