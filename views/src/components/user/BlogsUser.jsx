/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";

const BlogsUser = ({ blogs }) => {
    return (
        <>
            <div className="d-flex flex-column justify-content-center m-auto align-items-center">
            {blogs.length !== 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id} className="col-10 col-md-8">
                        <div
                            style={{ backgroundColor: "white" }}
                            className="rounded shadow m-2 p-2"
                        >
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
                            <div className="actions d-flex align-items-center mb-2 justify-content-between">
                                <div>
                                    <span className="bg-secondary text-light p-2 rounded-pill me-2">
                                        {blog.category.type}
                                    </span>
                                    <span className="bg-secondary text-light p-2 rounded-pill">
                                        {blog.category.name}
                                    </span>
                                </div>
                                {/* <div>
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
                                </div> */}
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
                    <div>no blogs exists</div>
                </div>
            )}
            </div>
        </>
    );
};

export default BlogsUser;
