/* eslint-disable react/prop-types */
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import CommentModel from "../blog/CommentModel";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

const ContentDashboard = ({ blogs, user }) => {
    const [idBlog, setIdBlog] = useState(null);
    const [savedBlog, setSavedBlog] = useState({});
    const [showComments, setShowComments] = useState({});

    const comment = (id) => {
        setShowComments((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        setIdBlog(id);
    };

    const saveBlog = (id) => {
        setSavedBlog((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        const isSaved = savedBlog[id]; // Check if the blog is saved

        toast.info(`blog ${isSaved ? "unsaved" : "saved"} successfully !`);
    };
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <Toaster duration={1000} position="top-center" richColors />
            {blogs.length !== 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id} data-aos="fade-up">
                        <div
                            style={{ backgroundColor: "white" }}
                            className="rounded shadow m-2 p-2"
                        >
                            <p className="text-secondary d-flex align-items-center">
                                <img
                                    src="/aucun_photo.png"
                                    className="me-2 rounded-pill"
                                    width={50}
                                    height={50}
                                    alt=""
                                />
                                <span>
                                    created by {blog.user.name} at{" "}
                                    <span> </span>
                                    {new Date(
                                        blog.created_at
                                    ).toLocaleDateString()}
                                </span>
                            </p>
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
                            <div className="actions d-flex align-items-center  justify-content-between">
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
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#exampleModal"
                                    >
                                        <i className="bi fs-4 bi-chat"></i>
                                    </button>
                                    <button onClick={() => saveBlog(blog.id)}>
                                        {savedBlog[blog.id] ? (
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
                                            <span>{c.user_id}</span>
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
            {/* <CommentModel idBlog={idBlog} comments={blogs.comments} idUser={user.id} /> */}
        </>
    );
};

export default ContentDashboard;
