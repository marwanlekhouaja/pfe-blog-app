/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "../../components/user/LayoutDashboardUser";
import { UserStateContext } from "../../context/UserContext";
import { Toaster, toast } from "sonner";
import CommentModel from "../../components/post/CommentModel";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import ListCategory from "../../components/category/ListCategory";

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [idBlog, setIdBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [save, setSave] = useState(false);
    const navigate = useNavigate();

    const context = useContext(UserStateContext);

    const [commentaires, setCommentaires] = useState([]);
    // const saveBlog = () => {
    //     toast.info("post saved successfully to your profile");
    // };
    const savePost =async (data) => {
        // save
        //     ? toast.info("post saved to your profile")
        //     : toast.info("post unsaved from you profile");
        setSave(!save);

        console.log(data)

        // const saved={title:data.title,body:data.body,image:data.image,user_id:}

        // const res=await axiosClient.post('api/saves',data) 
        // if(res.status==201){
        //     console.log('saved created succefully !')
        // }
        // else{
        //     console.log('failed to store saved')
        // }
    };

    const comment = async (id) => {
        await setIdBlog(id);
        await setCommentaires(blogs.comments);
        console.log(commentaires);
    };
    useEffect(() => {
        if (!window.localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/");
        }
        // axiosClient.get('/api/users').then(data=>setCreator(data.data.filter(u=>u.id==)))
        axiosClient
            .get("/api/user")
            .then((data) => setUser(data.data))
            .catch((error) => console.error(error));

        const fetchDataUser = async () => {
            const res = await axiosClient.get("/api/user");
            if (res.status !== 401) {
                setUser(res.data);
            }
        };
        fetchDataUser();

        axiosClient.get("/api/blog").then((data) => setBlogs(data.data));
        console.log(blogs);
    }, []);

    return (
        <>
            <div className="row">
                <LayoutDashboardUser />
                <Toaster richColors duration={1200} position="top-center" />
                <hr />
                <div className="blogs mt-4 pt-3 container col-8 col-md-7">
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
                                            created by {blog.user.name} at <span> </span>
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
                                                        ? blog.body.slice(
                                                              0,
                                                              200
                                                          ) + "..."
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
                                    <div className="actions d-flex align-items-center  justify-content-between">
                                        <div>
                                            <span className="bg-secondary text-light p-2 rounded-pill me-2">{blog.category.type}</span>
                                            <span className="bg-secondary text-light p-2 rounded-pill">{blog.category.name}</span>
                                        </div>
                                        <div>
                                            <button
                                                className="me-3"
                                                onClick={() => comment(blog.id)}
                                                data-bs-target="#exampleModal"
                                            >
                                                <i className="bi fs-4 bi-chat"></i>
                                            </button>
                                            <button onClick={()=>savePost(blog)}>
                                                <i className="bi fs-4 bi-bookmark"></i>
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
                </div>
                <div
                    style={{ flexWrap: "wrap" }}
                    className="topics mt-5 d-flex col-3 col-md-4"
                >
                    <ListCategory />
                </div>
                <CommentModel
                    user={user}
                    idBlog={idBlog}
                />
            </div>
        </>
    );
};

export default Dashboard;
