/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "./LayoutDashboardUser";
import { UserStateContext } from "../../context/UserContext";
import { Toaster, toast } from "sonner";
import CommentModel from "../post/CommentModel";
const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [idBlog,setIdBlog]=useState(null)
    const [blogs, setBlogs] = useState([]);
    const [save,setSave]=useState(false)
    const navigate = useNavigate();

    const context = useContext(UserStateContext);

    const [commentaires,setCommentaires]=useState([])
    // const saveBlog = () => {
    //     toast.info("post saved successfully to your profile");
    // };


    const savePost=()=>{
        setSave(!save)
    }

    const comment=(id)=>{
        setIdBlog(id)
        setCommentaires(blogs.comments.filter(c=>c.blog_id==id))
    }
    useEffect(() => {
        axiosClient
            .get("/api/user")
            .then((data) => setUser(data.data))
            .catch((error) => console.error(error));

        axiosClient.get("/api/blog").then((data) => setBlogs(data.data));
    }, []);
    return (
        <div>
            <Toaster richColors duration={1200} position="top-center" />
            <LayoutDashboardUser />
            <div className="blogs mt-5 pt-2 container">
                <hr />
                {blogs.length !== 0 ? (
                    blogs.map((blog) => (
                        <div key={blog.id} className="w-75">
                            <div className="rounded card m-2 p-2">
                                <p className="text-secondary d-flex align-items-center">
                                    <img
                                        src="/aucun_photo.png"
                                        className="me-2 rounded-pill"
                                        width={50}
                                        height={50}
                                        alt=""
                                    />
                                    <span>
                                        created by {blog.user.name} at
                                        {new Date(
                                            blog.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                {blog.image ? (
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="w-50">
                                            <h4>{blog.title}</h4>
                                            <p>
                                                {blog.body.length > 200
                                                    ? blog.body.slice(0, 200) +
                                                      "..."
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
                                                ? blog.body.slice(0, 200) +
                                                  "..."
                                                : blog.body}
                                        </p>
                                    </div>
                                )}
                                <div className="actions d-flex align-items-center mt-3 justify-content-end">
                                    <button className="me-3" onClick={()=>comment(blog.id)}   data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        <i className="bi fs-4 bi-chat"></i>
                                    </button>
                                    <button onClick={savePost}>
                                        <i className="bi fs-4 bi-bookmark"></i>
                                    </button>

                                </div>
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
            <CommentModel user={user} commentaires={commentaires} idBlog={idBlog} />

            {/* icon if save
            <i className="bi bi-bookmark"></i>
            {/* icon of save successfully  */}
            {/* <i className="bi bi-bookmark-check-fill"></i> */} 
        </div>
    );
};

export default Dashboard;
