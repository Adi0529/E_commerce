import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const AdminLayout = () => {

    return (

        <div className="d-flex flex-column min-vh-100">

            <Navbar />

            <div className="container-fluid flex-grow-1">

                <div className="row h-100">

                    <div className="col-lg-2 col-md-3 p-0">

                        <Sidebar />

                    </div>

                    <div className="col-lg-10 col-md-9 p-4">

                        <Outlet />

                    </div>

                </div>

            </div>

            <Footer />

        </div>

    );

};

export default AdminLayout;