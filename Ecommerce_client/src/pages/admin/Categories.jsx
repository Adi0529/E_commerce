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
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    changeCategoryStatus
} from "../../redux/categorySlice";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
const Categories = () => {

    const dispatch = useDispatch();

    const {

        categories,

        loading

    } = useSelector(

        state => state.category

    );
    const [show, setShow] = useState(false);

    const [editing, setEditing] = useState(false);

    const [selectedId, setSelectedId] = useState("");

    const [search, setSearch] = useState("");

    const [form, setForm] = useState({

        categoryName: "",

        description: "",

        categoryImage: null

    });
    useEffect(() => {

        dispatch(

            getCategories()

        );

    }, [dispatch]);
    const handleChange = (e) => {

        const {

            name,

            value,

            files

        } = e.target;

        if (name === "categoryImage") {

            setForm({

                ...form,

                categoryImage: files[0]

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

                updateCategory({

                    id: selectedId,

                    formData

                })

            );

        }

        else {

            dispatch(

                createCategory(

                    formData

                )

            );

        }

        setShow(false);

        setEditing(false);

    };
    const handleEdit = (category) => {

        setEditing(true);

        setSelectedId(category._id);

        setForm({

            categoryName: category.categoryName,

            description: category.description,

            categoryImage: null

        });

        setShow(true);

    };
    const filteredCategories =

        categories.filter(item =>

            item.categoryName

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        );
    if (loading) {
        return <Loader />;
    }
    if (!categories.length) {
        return (

            <EmptyState

                title="No Categories Found"

            />

        );
    }
    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="fw-bold">

                    Categories

                </h2>

                <Button

                    onClick={() => {

                        setEditing(false);

                        setForm({

                            categoryName: "",

                            description: "",

                            categoryImage: null

                        });

                        setShow(true);

                    }}

                >

                    <FaPlus className="me-2" />

                    Add Category

                </Button>

            </div>

            <Row className="mb-3">

                <Col md={6}>

                    <div className="position-relative">

                        <Form.Control

                            placeholder="Search Category"

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

            </Row>

            <Card className="shadow border-0 rounded-4">

                <Card.Body>

                    <Table responsive hover className="align-middle">

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Name</th>

                                <th>Description</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredCategories.map(category => (

                                    <tr key={category._id}>

                                        <td>

                                            <img

                                                src={`http://localhost:5006/uploads/products/category/${category.categoryImage}`}

                                                alt=""

                                                style={{

                                                    width: "70px",

                                                    height: "70px",

                                                    objectFit: "cover",

                                                    borderRadius: "10px"

                                                }}

                                            />

                                        </td>

                                        <td>

                                            {category.categoryName}

                                        </td>

                                        <td>

                                            {category.description}

                                        </td>

                                        <td>

                                            <Badge

                                                bg={

                                                    category.isActive

                                                        ?

                                                        "success"

                                                        :

                                                        "secondary"

                                                }

                                            >

                                                {

                                                    category.isActive

                                                        ?

                                                        "Active"

                                                        :

                                                        "Inactive"

                                                }

                                            </Badge>

                                        </td>

                                        <td>

                                            <div className="d-flex gap-2">

                                                <Button

                                                    variant="warning"

                                                    size="sm"

                                                    onClick={() => handleEdit(category)}

                                                >

                                                    <FaEdit />

                                                </Button>

                                                <Button

                                                    variant={

                                                        category.isActive

                                                            ?

                                                            "secondary"

                                                            :

                                                            "success"

                                                    }

                                                    size="sm"

                                                    onClick={() =>

                                                        dispatch(

                                                            changeCategoryStatus(

                                                                category._id

                                                            )

                                                        )

                                                    }

                                                >

                                                    {

                                                        category.isActive

                                                            ?

                                                            <FaToggleOn />

                                                            :

                                                            <FaToggleOff />

                                                    }

                                                </Button>

                                                <Button

                                                    variant="danger"

                                                    size="sm"

                                                    onClick={() => {

                                                        if (window.confirm("Delete Category?")) {

                                                            dispatch(

                                                                deleteCategory(

                                                                    category._id

                                                                )

                                                            );

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

            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="lg"
            >

                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>

                        <Modal.Title>

                            {

                                editing

                                    ?

                                    "Update Category"

                                    :

                                    "Create Category"

                            }

                        </Modal.Title>

                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3">

                            <Form.Label>

                                Category Name

                            </Form.Label>

                            <Form.Control

                                name="categoryName"

                                value={form.categoryName}

                                onChange={handleChange}

                                required

                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>

                                Description

                            </Form.Label>

                            <Form.Control

                                as="textarea"

                                rows={3}

                                name="description"

                                value={form.description}

                                onChange={handleChange}

                            />

                        </Form.Group>

                        <Form.Group>

                            <Form.Label>

                                Category Image

                            </Form.Label>

                            <Form.Control

                                type="file"

                                name="categoryImage"

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

                            {

                                editing

                                    ?

                                    "Update"

                                    :

                                    "Create"

                            }

                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        </div>

    );

};

export default Categories;