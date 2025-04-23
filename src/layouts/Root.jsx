import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <ScrollToTop></ScrollToTop>
            <div className="min-h-screen">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;