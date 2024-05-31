/* eslint-disable react/prop-types */

import { useState } from "react";
import CommentModel from "../post/CommentModel";
import {toast,Toaster} from 'sonner'

const ContentDashboard = ({ blogs,user }) => {

    const [idBlog,setIdBlog]=useState(null)
    const [save,setSave]=useState(false)
    const comment=(id)=>{
        setIdBlog(id)
    }

    const saveBlog=()=>{
        setSave(!save)
        save?toast.info('blog unsaved successfully !'):toast.info('blog saved successfully !')
    }
    return (
        <>
        <Toaster duration={1000} position="top-center" richColors />
            {blogs.length !== 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id} className="">
                        <div className="rounded card shadow m-2 p-2">
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
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal" >
                                        <i className="bi fs-4 bi-chat"></i>
                                    </button>
                                    <button onClick={saveBlog}>
                                        {save?<i className="bi fs-4 bi-bookmark-check-fill"></i>:<i className="bi fs-4 bi-bookmark"></i>}
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
                    <span className="spinner-border"></span>
                </div>
            )}
            <CommentModel idBlog={idBlog} comments={blogs.comments} idUser={user.id} />
        </>
    );
};

export default ContentDashboard;
