/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "../../components/user/LayoutDashboardUser";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import ListCategory from "../../components/category/ListCategory";
import ContentDashboard from "../../components/user/ContentDashboard";

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        if (!window.localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/");
        }
        // axiosClient.get('/api/users').then(data=>setCreator(data.data.filter(u=>u.id==)))
        axiosClient
            .get("/api/user")
            .then((data) => setUser(data.data))
            .catch((error) => console.error(error));

        const fetchDataUser = async () => {
            const res = await axiosClient.get("/api/user");
            if (res.status !== 401) {
                setUser(res.data);
            }
        };
        fetchDataUser();

        axiosClient.get("/api/blog").then((data) => setBlogs(data.data));
    }, []);

    return (
        <>
            <div className="row">
                <LayoutDashboardUser />
                <hr />
                <div className="blogs mt-4 pt-3 container col-8 col-md-7">
                    <ContentDashboard user={user} blogs={blogs} />
                </div>
                <div
                    style={{ flexWrap: "wrap" }}
                    className="topics mt-5  col-3 col-md-4"
                >
                    <h3 style={{ fontFamily: "monospace" }}>Recommended Topics</h3>
                    <ListCategory />
                </div>
                
            </div>
        </>
    );
};

export default Dashboard;
