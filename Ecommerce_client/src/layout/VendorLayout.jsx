import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const VendorLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 pb-5 mb-0">

            <Navbar />

            <div className="container-fluid flex-grow-1">

                <div className="row h-100">

                    <div
                        className="col-lg-2 col-md-3 p-0"
                        style={{
                            background: "#212529",
                            minHeight: "100%"
                        }}
                    >
                        <Sidebar />
                    </div>

                    <div className="col-lg-10 col-md-9 p-4">
                        <Outlet />
                    </div>

                </div>

            </div>

            <Footer />
            <div className="pb-5"></div>

        </div>
    );
};

export default VendorLayout;