import { useSelector } from "react-redux";

import {
    FaUsers,
    FaStore,
    FaBoxOpen,
    FaClipboardList,
    FaShoppingCart,
    FaCheckCircle,
    FaHourglassHalf,
    FaRupeeSign
} from "react-icons/fa";

const Dashboard = () => {

    const { user } = useSelector((state) => state.auth);

    const role = user?.Role || user?.role;

    const adminStats = [
        {
            title: "Users",
            value: 120,
            icon: <FaUsers />,
            color: "primary"
        },
        {
            title: "Vendors",
            value: 25,
            icon: <FaStore />,
            color: "success"
        },
        {
            title: "Products",
            value: 540,
            icon: <FaBoxOpen />,
            color: "warning"
        },
        {
            title: "Orders",
            value: 310,
            icon: <FaClipboardList />,
            color: "danger"
        }
    ];

    const vendorStats = [
        {
            title: "My Products",
            value: 40,
            icon: <FaBoxOpen />,
            color: "primary"
        },
        {
            title: "Orders",
            value: 190,
            icon: <FaClipboardList />,
            color: "success"
        },
        {
            title: "Pending Orders",
            value: 12,
            icon: <FaHourglassHalf />,
            color: "warning"
        },
        {
            title: "Revenue",
            value: "₹85,000",
            icon: <FaRupeeSign />,
            color: "danger"
        }
    ];

    const userStats = [
        {
            title: "Cart Items",
            value: 4,
            icon: <FaShoppingCart />,
            color: "primary"
        },
        {
            title: "Orders",
            value: 15,
            icon: <FaClipboardList />,
            color: "success"
        },
        {
            title: "Delivered",
            value: 12,
            icon: <FaCheckCircle />,
            color: "info"
        },
        {
            title: "Pending",
            value: 3,
            icon: <FaHourglassHalf />,
            color: "warning"
        }
    ];

    const stats =
        role === "Admin"
            ? adminStats
            : role === "Vendor"
                ? vendorStats
                : userStats;

    return (

        <div className="container-fluid">

            <h2 className="fw-bold mb-1">
                Welcome, {user?.Name}
            </h2>

            <p className="text-muted mb-4">
                {role} Dashboard
            </p>

            <div className="row g-4">

                {
                    stats.map((item, index) => (

                        <div
                            className="col-lg-3 col-md-6"
                            key={index}
                        >

                            <div className={`card bg-${item.color} text-white shadow`}>

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <h6>{item.title}</h6>

                                            <h2>{item.value}</h2>

                                        </div>

                                        <div style={{ fontSize: "45px" }}>

                                            {item.icon}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

            <div className="row mt-5">

                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-header fw-bold">

                            Recent Activity

                        </div>

                        <div className="card-body">

                            No recent activity.

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card shadow">

                        <div className="card-header fw-bold">

                            Quick Actions

                        </div>

                        <div className="card-body">

                            {
                                role === "Admin" &&
                                <>
                                    <button className="btn btn-primary w-100 mb-2">
                                        Manage Users
                                    </button>

                                    <button className="btn btn-success w-100 mb-2">
                                        Manage Vendors
                                    </button>

                                    <button className="btn btn-warning w-100 mb-2">
                                        Manage Categories
                                    </button>

                                    <button className="btn btn-danger w-100">
                                        Manage Brands
                                    </button>
                                </>
                            }

                            {
                                role === "Vendor" &&
                                <>
                                    <button className="btn btn-success w-100 mb-2">
                                        Add Product
                                    </button>

                                    <button className="btn btn-warning w-100">
                                        View Orders
                                    </button>
                                </>
                            }

                            {
                                role === "User" &&
                                <>
                                    <button className="btn btn-primary w-100 mb-2">
                                        Browse Products
                                    </button>

                                    <button className="btn btn-success w-100">
                                        My Orders
                                    </button>
                                </>
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;