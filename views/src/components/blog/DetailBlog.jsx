/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "../user/LayoutDashboardUser";

function DetailBlog() {
    const [blog, setBlog] = useState([]);

    const { name } = useParams();
    const titleBlog = name.replaceAll("_", " ");

    useEffect(() => {
        const fetchDetailBlog = async () => {
            const res = await axiosClient.get(`/api/blog/${titleBlog}`);
            if (res.status == 200) {
                setBlog(res.data);
            } else {
                console.log("blog not found !");
            }
        };
        fetchDetailBlog();
    }, []);
    return (
        <div>
            <LayoutDashboardUser />
            <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                {blog.length !== 0 ? (
                    blog.map((b, index) => (
                        <div key={index} className="col-10 col-md-7">
                            <h1>{b.title}</h1>
                            <div>
                                <img
                                    src={`http://localhost:8000/storage/${b.image}`}
                                    alt=""
                                    className="w-100"
                                />
                            </div>
                            <p
                                style={{ fontFamily: "monospace" }}
                                className="mt-3"
                            >
                                {b.body}
                            </p>
                        </div>
                    ))
                ) : (
                    <div
                        style={{ height: "80dvh" }}
                        className="d-flex align-items-center justify-content-center align-items-center"
                    >
                        <span className="spinner-border"></span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailBlog;
