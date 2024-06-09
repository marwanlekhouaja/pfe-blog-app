/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const BlogsSavesUser = ({ saves }) => {
    const {unsaveBlog}=useContext(AppContext)

    const removeSaveBlog=(id)=>{
        unsaveBlog(id)
    }
    return (
        <>
            <div className="d-flex flex-column justify-content-center m-auto align-items-center">
            {saves ? (
                saves.map((save) => (
                    <div key={save.id} className="col-10 col-md-8">
                        <div
                            style={{ backgroundColor: "white" }}
                            className="rounded shadow m-2 p-2"
                        >
                            {save.blog.image ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="w-75 p-2">
                                        <Link
                                            className="text-decoration-none text-dark"
                                            to={`/blog/${save.blog.title.replaceAll(
                                                " ",
                                                "_"
                                            )}`}
                                        >
                                            <h4>{save.blog.title}</h4>
                                            <p>
                                                {save.blog.body.length > 200
                                                    ? save.blog.body.slice(0, 200) +
                                                      "..."
                                                    : save.blog.body}
                                            </p>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to={`/blog/${save.blog.title.replaceAll(
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
                                                src={`http://localhost:8000/storage/${save.blog.image}`}
                                                className="rounded"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Link
                                        className="text-decoration-none text-dark"
                                        to={`/blog/${save.blog.title.replaceAll(
                                            " ",
                                            "_"
                                        )}`}
                                    >
                                        <h4>{save.blog.title}</h4>
                                        <p>
                                            {save.blog.body.length > 200
                                                ? save.blog.body.slice(0, 200) +
                                                  "..."
                                                : save.blog.body}
                                        </p>
                                    </Link>
                                </div>
                            )}
                            <div className="actions d-flex align-items-center mb-2 justify-content-between">
                                <div>
                                    <span className="bg-secondary text-light p-2 rounded-pill me-2">
                                        {save.blog.category.type}
                                    </span>
                                    <span className="bg-secondary text-light p-2 rounded-pill">
                                        {save.blog.category.name}
                                    </span>
                                </div>
                                <div>
                                    <button onClick={()=>removeSaveBlog(save.id)}>
                                        <i className="bi fs-4 bi-bookmark-check-fill"></i>
                                    </button>
                                </div>
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

export default BlogsSavesUser;
