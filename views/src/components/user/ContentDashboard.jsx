/* eslint-disable react-hooks/exhaustive-deps */
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import CommentModel from "../blog/CommentModel";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ContentDashboard = () => {
    const { ListBlogs, user, saveBlog, unsaveBlog,deleteBlog } = useContext(AppContext);
    const [idBlog, setIdBlog] = useState(null);
    const [savedBlogIds, setSavedBlogIds] = useState(new Set());
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        AOS.init();
        extractSavedBlogs();
    }, [ListBlogs]);

    const extractSavedBlogs = () => {
        const savedBlogs = new Set();
        ListBlogs.forEach((blog) => {
            if (blog.saves.some((save) => save.user_id === user.id)) {
                savedBlogs.add(blog.id);
            }
        });
        setSavedBlogIds(savedBlogs);
    };

    const comment = (id) => {
        setShowComments((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        setIdBlog(id);
    };

    const handleSaveBlog = async (id) => {
        if (savedBlogIds.has(id)) {
            await unsaveBlog(id);
            setSavedBlogIds((prevState) => {
                const newSet = new Set(prevState);
                newSet.delete(id);
                toast.info("blog unsaved successfully !");
                return newSet;
            });
        } else {
            await saveBlog(id);
            toast.info("blog saved successfully");
            setSavedBlogIds((prevState) => new Set(prevState).add(id));
        }
    };

    const removeBlog=(id)=>{
        deleteBlog(id)
    }

    return (
        <>
            <Toaster duration={1000} position="top-center" richColors />
            {ListBlogs.length !== 0 ? (
                ListBlogs.map((blog) => (
                    <div key={blog.id} data-aos="fade-up">
                        <div
                            style={{ backgroundColor: "white" }}
                            className="rounded shadow m-2 p-2"
                        >
                            <div className="text-secondary justify-content-between d-flex align-items-center">
                                <div>
                                    <img
                                        src="/aucun_photo.png"
                                        className="me-2 rounded-pill"
                                        width={50}
                                        height={50}
                                        alt=""
                                    />
                                    <span>
                                        created by {blog.user.name} at{" "}
                                        {new Date(
                                            blog.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="actions">
                                    {user.id == blog.user.id && (
                                        <button className="btn btn-danger me-2" onClick={()=>removeBlog(blog.id)}>
                                            <i className="bi bi-trash3-fill"></i>
                                        </button>
                                    )}
                                    {user.id == blog.user.id && (
                                        <button className="btn btn-success">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {blog.image ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="w-75 p-2">
                                        <Link
                                            className="text-decoration-none text-dark"
                                            to={`/blog/${blog.title.replaceAll(
                                                " ",
                                                "_"
                                            )}`}
                                        >
                                            <h4>{blog.title}</h4>
                                            <p>
                                                {blog.body.length > 200
                                                    ? blog.body.slice(0, 200) +
                                                      "..."
                                                    : blog.body}
                                            </p>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to={`/blog/${blog.title.replaceAll(
                                                " ",
                                                "_"
                                            )}`}
                                        >
                                            <img
                                                style={{
                                                    height: "200px",
                                                    width: "200px",
                                                }}
                                                loading="lazy"
                                                src={`http://localhost:8000/storage/${blog.image}`}
                                                className="rounded"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Link
                                        className="text-decoration-none text-dark"
                                        to={`/blog/${blog.title.replaceAll(
                                            " ",
                                            "_"
                                        )}`}
                                    >
                                        <h4>{blog.title}</h4>
                                        <p>
                                            {blog.body.length > 200
                                                ? blog.body.slice(0, 200) +
                                                  "..."
                                                : blog.body}
                                        </p>
                                    </Link>
                                </div>
                            )}
                            <div className="actions d-flex align-items-center justify-content-between">
                                <div>
                                    <span className="bg-secondary text-light p-2 rounded-pill me-2">
                                        {blog.category.type}
                                    </span>
                                    <span className="bg-secondary text-light p-2 rounded-pill">
                                        {blog.category.name}
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="me-3"
                                        onClick={() => comment(blog.id)}
                                    >
                                        <i className="bi fs-4 bi-chat"></i>
                                    </button>
                                    <button
                                        onClick={() => handleSaveBlog(blog.id)}
                                    >
                                        {savedBlogIds.has(blog.id) ? (
                                            <i className="bi fs-4 bi-bookmark-check-fill"></i>
                                        ) : (
                                            <i className="bi fs-4 bi-bookmark"></i>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                {showComments[blog.id] && <hr />}
                                {showComments[blog.id] && (
                                    <CommentModel
                                        key={blog.id}
                                        idUser={user.id}
                                        idBlog={idBlog}
                                    />
                                )}
                                {showComments[blog.id] &&
                                    blog.comments?.map((c) => (
                                        <div
                                            key={c.id}
                                            className="rounded-pill bg-light m-2 p-2"
                                        >
                                            <span>{c.user.name}</span>
                                            <br />
                                            <span>{c.comment}</span>
                                        </div>
                                    ))}
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
        </>
    );
};

export default ContentDashboard;
