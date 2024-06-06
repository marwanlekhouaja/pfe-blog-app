/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutDashboardUser from "../../components/user/LayoutDashboardUser";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import ListCategory from "../../components/category/ListCategory";
import ContentDashboard from "../../components/user/ContentDashboard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AppContext } from "../../context/AppContext";
const Dashboard = () => {
    const context=useContext(AppContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/");
        }
        AOS.init()

    }, []);

    return (
        <>
            <LayoutDashboardUser />
            <div className="row bg-light">
                <div className="blogs pt-3 mt-3 container col-10 col-md-7">
                    <ContentDashboard user={context.user} blogs={context.ListBlogs} />
                </div>
                <div
                    style={{ flexWrap: "wrap" }}
                    className="topics mt-5 hidden md:block col-10 col-md-4"
                >
                    <h3 style={{ fontFamily: "monospace" }} data-aos="fade-up">
                        Recommended Topics {context.name}
                    </h3>
                    <ListCategory />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
