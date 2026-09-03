import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {

    return (

        <>

            <Navbar />

            <main
                className="min-vh-100"
                style={{
                    background: "#f8f9fa"
                }}
            >
                <Outlet />
            </main>

            <Footer />

        </>

    );

};

export default MainLayout;