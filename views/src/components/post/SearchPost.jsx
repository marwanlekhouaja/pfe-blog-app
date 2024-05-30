import { useParams } from "react-router-dom";
import LayoutDashboardUser from "../user/LayoutDashboardUser";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";

const SearchPost = () => {
    const { search } = useParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogsOfSearch = async () => {
            const res = await axiosClient.get(`api/blogs/${search}`);
            if (res.status == 200) {
               setBlogs(res.data)
            } else {
                console.log("failed to fetch data from search !");
            }
        };
        fetchBlogsOfSearch();
    },[]);

    return (
        <div>
            <LayoutDashboardUser />
            <div className="mt-5 pt-3 container">
                <h2
                    style={{ fontFamily: "monospace" }}
                    className="text-center mt-5"
                >
                    Blogs about {search}
                </h2>
                {blogs.length!==0?blogs.map((blog) => (
                    <div key={blog.id} className="rounded card shadow m-2 p-2">
                        <p className="text-secondary d-flex align-items-center">
                            <img
                                src="/aucun_photo.png"
                                className="me-2 rounded-pill"
                                width={50}
                                height={50}
                                alt=""
                            />
                            <span>
                                created by {blog.user.name} at <span> </span>
                                {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                        </p>
                        {blog.image ? (
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="w-75 p-2">
                                    <h4>{blog.title}</h4>
                                    <p>
                                        {blog.body.length > 200
                                            ? blog.body.slice(0, 200) + "..."
                                            : blog.body}
                                    </p>
                                </div>
                                <div>
                                    <img
                                        style={{
                                            height: "200px",
                                            width: "200px",
                                        }}
                                        loading="lazy"
                                        src={`http://localhost:8000/storage/${blog.image}`}
                                        className="rounded"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h4>{blog.title}</h4>
                                <p>
                                    {blog.body.length > 200
                                        ? blog.body.slice(0, 200) + "..."
                                        : blog.body}
                                </p>
                            </div>
                        )}
                        <div className="actions d-flex align-items-center m-2  justify-content-between">
                            <div>
                                <span className="bg-secondary text-light p-2 rounded-pill me-2">
                                    {blog.category.type}
                                </span>
                                <span className="bg-secondary text-light p-2 rounded-pill">
                                    {blog.category.name}
                                </span>
                            </div>
                        </div>

                    </div>
                )):
                <div className="text-center mt-4">blogs not found in this topic !</div>}
            </div>
        </div>
    );
};

export default SearchPost;
