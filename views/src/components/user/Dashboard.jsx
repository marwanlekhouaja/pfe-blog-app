/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "./LayoutDashboardUser";
const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/");
        }
        axiosClient
            .get("/api/user")
            .then((data) => setUser(data.data))
            .catch((error) => console.error(error));

        axiosClient.get("/api/blog").then((data) => setBlogs(data.data));
        
    }, []);
    return (
        <div className="">
            <LayoutDashboardUser />
            <div className="blogs container">
                {blogs.length !== 0 ? (
                    blogs.map((blog) => (
                        <div key={blog.id}>
                            <div className="rounded card m-2 p-2">
                            <p className="text-secondary">
                                created by {blog.user.name} at{" "}
                                {new Date(blog.created_at).toLocaleDateString()}
                            </p>
                            {blog.image ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="w-50">
                                        <h4>{blog.title}</h4>
                                        <p>{blog.body.length>200?blog.body.slice(0,200)+'...':blog.body}</p>
                                    </div>
                                    <div>
                                        <img
                                            style={{ height: "200px",width:'200px' }}
                                            src={`http://localhost:8000/storage/${blog.image}`}
                                            className="rounded"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                  <h4>{blog.title}</h4>
                                  <p>{blog.body.length>200?blog.body.slice(0,200)+'...':blog.body}</p>
                                </div>
                            )}
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <div
                        style={{ height: "90dvh" }}
                        className="d-flex justify-content-center align-items-center"
                    >
                        <span className="spinner-border"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
