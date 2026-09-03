import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ================= Layouts =================

import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import VendorLayout from "./layout/VendorLayout";

// ================= Protected Route =================

import ProtectedRoute from "./components/ProtectedRoute";

// ================= Auth =================

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ================= Public/User Pages =================

import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import ProductDetails from "./pages/public/ProductDetails";
import Categories from "./pages/public/Categories";
import BrandProducts from "./pages/public/BrandProducts";
import Search from "./pages/public/Search";

import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import CategoryProducts from "./pages/public/CategoryProducts";

import ProductByBrand from "./pages/public/ProductByBrand";
// ================= Vendor =================

import VendorDashboard from "./pages/vendor/Dashboard";
import AddProduct from "./pages/vendor/AddProduct";
import MyProducts from "./pages/vendor/MyProducts";
import VendorOrders from "./pages/vendor/Orders";

// ================= Admin =================

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Vendors from "./pages/admin/Vendors";
import AdminCategories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= DEFAULT ================= */}

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* ================= AUTH ================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ================= USER ================= */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["User", "Admin", "Vendor"]}
                        />
                    }
                >

                    <Route element={<MainLayout />}>

                        <Route
                            path="/home"
                            element={<Home />}
                        />

                        <Route
                            path="/products"
                            element={<Products />}
                        />

                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />

                        <Route
                            path="/categories"
                            element={<Categories />}
                        />

                        {/* <Route
                            path="/brand/:id"
                            element={<BrandProducts />}
                        /> */}

                        <Route
                            path="/search"
                            element={<Search />}
                        />

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />

                        <Route
                            path="/checkout"
                            element={<Checkout />}
                        />

                        <Route
                            path="/orders"
                            element={<Orders />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                        <Route
                            path="/category/:id"
                            element={<CategoryProducts />}
                        />
                        <Route
                            path="/brand/:id"
                            element={<ProductByBrand />}
                        />

                    </Route>

                </Route>

                {/* ================= VENDOR ================= */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["Vendor"]}
                        />
                    }
                >

                    <Route element={<VendorLayout />}>

                        <Route
                            path="/vendor"
                            element={<VendorDashboard />}
                        />

                        <Route
                            path="/vendor/add-product"
                            element={<AddProduct />}
                        />

                        <Route
                            path="/vendor/my-products"
                            element={<MyProducts />}
                        />

                        <Route
                            path="/vendor/orders"
                            element={<VendorOrders />}
                        />
                        <Route
                            path="/vendor/profile"
                            element={<Profile />}
                        />


                    </Route>

                </Route>

                {/* ================= ADMIN ================= */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["Admin"]}
                        />
                    }
                >

                    <Route element={<AdminLayout />}>

                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/users"
                            element={<Users />}
                        />

                        <Route
                            path="/admin/vendors"
                            element={<Vendors />}
                        />

                        <Route
                            path="/admin/categories"
                            element={<AdminCategories />}
                        />

                        <Route
                            path="/admin/brands"
                            element={<Brands />}
                        />

                        <Route
                            path="/admin/products"
                            element={<AdminProducts />}
                        />

                        <Route
                            path="/admin/orders"
                            element={<AdminOrders />}
                        />
                        <Route
                            path="/admin/profile"
                            element={<Profile />}
                        />

                    </Route>

                </Route>

                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={
                        <h2 className="text-center mt-5">
                            404 | Page Not Found
                        </h2>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;