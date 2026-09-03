import { useEffect, useState } from "react";

import {
    Card,
    Table,
    Button,
    Badge,
    Form,
    Modal,
    Row,
    Col
} from "react-bootstrap";

import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff
} from "react-icons/fa";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    changeBrandStatus
} from "../../redux/brandSlice";

import {
    getCategories
} from "../../redux/categorySlice";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
const Brands = () => {

    const dispatch = useDispatch();

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
    const [show, setShow] = useState(false);

    const [editing, setEditing] = useState(false);

    const [selectedId, setSelectedId] = useState("");

    const [search, setSearch] = useState("");

    const [filterCategory, setFilterCategory] = useState("");

    const [form, setForm] = useState({

        brandName: "",

        categoryId: "",

        brandLogo: null

    });
    useEffect(() => {

        dispatch(getBrands());

        dispatch(getCategories());

    }, [dispatch]);
    const handleChange = (e) => {

        const {

            name,

            value,

            files

        } = e.target;

        if (name === "brandLogo") {

            setForm({

                ...form,

                brandLogo: files[0]

            });

        }

        else {

            setForm({

                ...form,

                [name]: value

            });

        }

    };
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach(key => {

            formData.append(

                key,

                form[key]

            );

        });

        if (editing) {

            dispatch(

                updateBrand({

                    id: selectedId,

                    formData

                })

            );

        }

        else {

            dispatch(

                createBrand(formData)

            );

        }

        setShow(false);

        setEditing(false);

    };
    const handleEdit = (brand) => {

        setEditing(true);

        setSelectedId(brand._id);

        setForm({

            brandName: brand.brandName,

            categoryId: brand.category._id,

            brandLogo: null

        });

        setShow(true);

    };
    const filteredBrands = brands.filter(brand => {

        const searchMatch =

            brand.brandName

                .toLowerCase()

                .includes(search.toLowerCase());

        const categoryMatch =

            !filterCategory ||

            brand.category?._id === filterCategory;

        return searchMatch && categoryMatch;

    });
    if (loading) {
        return <Loader />;
    }
    if (!brands.length) {
        return (

            <EmptyState

                title="No Brands Found"

            />

        );
    }
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">

                    Brands

                </h2>

                <Button

                    onClick={() => {

                        setEditing(false);

                        setForm({

                            brandName: "",

                            category: "",

                            brandLogo: null

                        });

                        setShow(true);

                    }}

                >

                    <FaPlus className="me-2" />

                    Add Brand

                </Button>

            </div>

            <Row className="mb-3">

                <Col md={6}>

                    <div className="position-relative">

                        <Form.Control

                            placeholder="Search Brand"

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                        <FaSearch

                            className="position-absolute"

                            style={{

                                top: "12px",

                                right: "15px"

                            }}

                        />

                    </div>

                </Col>

                <Col md={6}>

                    <Form.Select

                        value={filterCategory}

                        onChange={(e) =>

                            setFilterCategory(e.target.value)

                        }

                    >

                        <option value="">

                            All Categories

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

                </Col>

            </Row>

            <Card className="shadow border-0 rounded-4">

                <Card.Body>

                    <Table responsive hover className="align-middle">

                        <thead>

                            <tr>

                                <th>Logo</th>

                                <th>Brand</th>

                                <th>Category</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredBrands.map(brand => (

                                    <tr key={brand._id}>

                                        <td>

                                            <img

                                                src={`http://localhost:5006/uploads/products/brand/${brand.brandLogo}`}

                                                alt=""

                                                style={{

                                                    width: "60px",

                                                    height: "60px",

                                                    borderRadius: "10px",

                                                    objectFit: "cover"

                                                }}

                                            />

                                        </td>

                                        <td>

                                            {brand.brandName}

                                        </td>

                                        <td>

                                            {brand.category?.categoryName}

                                        </td>

                                        <td>

                                            <Badge

                                                bg={brand.isActive ? "success" : "secondary"}

                                            >

                                                {brand.isActive ? "Active" : "Inactive"}

                                            </Badge>

                                        </td>

                                        <td>

                                            <div className="d-flex gap-2">

                                                <Button

                                                    size="sm"

                                                    variant="warning"

                                                    onClick={() => handleEdit(brand)}

                                                >

                                                    <FaEdit />

                                                </Button>

                                                <Button

                                                    size="sm"

                                                    variant={brand.isActive ? "secondary" : "success"}

                                                    onClick={() => dispatch(changeBrandStatus(brand._id))}

                                                >

                                                    {

                                                        brand.isActive

                                                            ?

                                                            <FaToggleOn />

                                                            :

                                                            <FaToggleOff />

                                                    }

                                                </Button>

                                                <Button

                                                    size="sm"

                                                    variant="danger"

                                                    onClick={() => {

                                                        if (window.confirm("Delete Brand?")) {

                                                            dispatch(deleteBrand(brand._id));

                                                        }

                                                    }}

                                                >

                                                    <FaTrash />

                                                </Button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

            <Modal show={show} onHide={() => setShow(false)}>

                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>

                        <Modal.Title>

                            {editing ? "Update Brand" : "Create Brand"}

                        </Modal.Title>

                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3">

                            <Form.Label>Brand Name</Form.Label>

                            <Form.Control

                                name="brandName"

                                value={form.brandName}

                                onChange={handleChange}

                                required

                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>Category</Form.Label>

                            <Form.Select

                                name="categoryId"

                                value={form.categoryId}

                                onChange={handleChange}

                                required

                            >

                                <option value="">Select Category</option>

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

                        <Form.Group>

                            <Form.Label>Brand Logo</Form.Label>

                            <Form.Control

                                type="file"

                                name="brandLogo"

                                onChange={handleChange}

                            />

                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>

                        <Button

                            variant="secondary"

                            onClick={() => setShow(false)}

                        >

                            Cancel

                        </Button>

                        <Button type="submit">

                            {editing ? "Update" : "Create"}

                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        </div>

    );

};

export default Brands;