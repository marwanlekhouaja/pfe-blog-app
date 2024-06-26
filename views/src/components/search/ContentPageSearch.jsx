/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";

const ContentPageSearch = ({ blogs }) => {
    return (
        <>
            {blogs.length !== 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id} data-aos="fade-up">
                        <div className="rounded m-2 p-2">
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
                                        <h4>{blog.title}</h4>
                                        <p>
                                            {blog.body.length > 200
                                                ? blog.body.slice(0, 200) +
                                                  "..."
                                                : blog.body}
                                        </p>
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
                        <hr />
                    </div>
                ))
            ) : (
                <h1 className="text-center mt-4">
                    blogs not found in this topic !
                </h1>
            )}
        </>
    );
};

export default ContentPageSearch;
