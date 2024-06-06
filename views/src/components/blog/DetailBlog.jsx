/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "../user/LayoutDashboardUser";
import CommentModel from "./CommentModel";

function DetailBlog() {
    const [blog, setBlog] = useState([]);
    const [user,setUser]=useState({})

    const { name } = useParams();
    const titleBlog = name.replaceAll("_", " ");

    const fetchDetailBlog = async () => {
        const res = await axiosClient.get(`/api/blog/${titleBlog}`);
        if (res.status == 200) {
            setBlog(res.data);
        } else {
            console.log("blog not found !");
        }
    };

    const fetchUserData=async ()=>{
        const res=await axiosClient.get('/api/user')
        setUser(res.data)
    }

    useEffect(() => {
        fetchDetailBlog();
        fetchUserData()
    }, []);
    return (
        <div>
            <LayoutDashboardUser />
            <div className="mt-5 d-flex flex-column justify-content-center align-items-center mb-4">
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
                            <div className="p-2 shadow rounded-lg">
                                <h3>Comments</h3>
                                <CommentModel idBlog={b.id} idUser={user.id} />
                                {b.comments.length!==0?b.comments.map((comment)=>(
                                    <div key={comment.id} style={{backgroundColor:'#eee'}} className="rounded-pill m-2 ps-2 p-1 ">
                                        <span className="text-secondary ms-1">{comment.user.name}</span>
                                        <p className="ms-1">{comment.comment}</p>   
                                    </div>
                                )):<span>no comments on this blog</span>}
                            </div>
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
