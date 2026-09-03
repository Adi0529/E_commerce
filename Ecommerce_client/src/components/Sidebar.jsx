import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    FaTachometerAlt,
    FaUsers,
    FaStore,
    FaBoxOpen,
    FaShoppingCart,
    FaClipboardList,
    FaUser,
    FaPlusCircle,
    FaSignOutAlt,
    FaList,
    FaTags
} from "react-icons/fa";

const Sidebar = () => {

    const { user } = useSelector((state) => state.auth);

    const role = user?.Role || user?.role;

    const adminMenus = [

        {
            title: "Dashboard",
            path: "/admin",
            icon: <FaTachometerAlt />
        },

        {
            title: "Users",
            path: "/admin/users",
            icon: <FaUsers />
        },

        {
            title: "Vendors",
            path: "/admin/vendors",
            icon: <FaStore />
        },

        {
            title: "Categories",
            path: "/admin/categories",
            icon: <FaList />
        },

        {
            title: "Brands",
            path: "/admin/brands",
            icon: <FaTags />
        },

        {
            title: "Products",
            path: "/admin/products",
            icon: <FaBoxOpen />
        },

        {
            title: "Orders",
            path: "/admin/orders",
            icon: <FaClipboardList />
        },
        {
            title: "Profile",
            path: "/admin/profile",
            icon: <FaUser />
        }

    ];

    const vendorMenus = [

        {
            title: "Dashboard",
            path: "/vendor",
            icon: <FaTachometerAlt />
        },

        {
            title: "Add Product",
            path: "/vendor/add-product",
            icon: <FaPlusCircle />
        },

        {
            title: "My Products",
            path: "/vendor/my-products",
            icon: <FaBoxOpen />
        },

        {
            title: "Orders",
            path: "/vendor/orders",
            icon: <FaClipboardList />
        },

        {
            title: "Profile",
            path: "/vendor/profile",
            icon: <FaUser />
        }

    ];

    const userMenus = [

        {
            title: "Home",
            path: "/home",
            icon: <FaTachometerAlt />
        },

        {
            title: "Products",
            path: "/products",
            icon: <FaBoxOpen />
        },

        {
            title: "Cart",
            path: "/cart",
            icon: <FaShoppingCart />
        },

        {
            title: "Orders",
            path: "/orders",
            icon: <FaClipboardList />
        },

        {
            title: "Profile",
            path: "/profile",
            icon: <FaUser />
        }

    ];

    const menus =
        role === "Admin"
            ? adminMenus
            : role === "Vendor"
                ? vendorMenus
                : userMenus;

    return (

        <div
            className="bg-dark text-white w-100 vh-100"
            
        >

            <div className="text-center p-3 border-bottom">

                <h4>E-Commerce</h4>

            </div>

            <ul className="nav flex-column mt-3">

                {

                    menus.map((menu) => (

                        <li
                            key={menu.path}
                            className="nav-item"
                        >

                            <NavLink
                                to={menu.path}
                                className={({ isActive }) =>
                                    `nav-link text-white px-4 py-3 ${isActive ? "bg-primary" : ""
                                    }`
                                }
                            >

                                <span className="me-3">

                                    {menu.icon}

                                </span>

                                {menu.title}

                            </NavLink>

                        </li>

                    ))

                }

                <li className="mt-5">

                    <NavLink
                        to="/login"
                        className="nav-link text-danger px-4 py-3"
                    >

                        <FaSignOutAlt className="me-3" />

                        Logout

                    </NavLink>

                </li>

            </ul>

        </div>

    );

};

export default Sidebar;