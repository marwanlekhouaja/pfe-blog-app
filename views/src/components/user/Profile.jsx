/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect,  useState } from "react";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "./LayoutDashboardUser";
import PostsUser from './BlogsUser' 

const Profile = () => {
    const [user, setUser] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchDataUser = async () => {
            const res = await axiosClient.get("/api/user");
            setUser(res.data);
        };
        fetchDataUser();

        const fetchPostsUser = async () => {
            try {
                const data = await axiosClient.get("/api/user");
                const res = await axiosClient.get(`api/users/${data.data.id}`);
                if (res.status == 200) {
                    setBlogs(res.data);
                }
            } catch (error) {
                console.log("error fetching posts of this user ! because "+error);
            }
        };
        fetchPostsUser();
    }, []);
    return (
        <div>
            <LayoutDashboardUser />
            {user.length !== 0 ? (
                <div className="mt-5 shadow  bg-light pt-4 rounded col-10 col-md-8 m-auto d-flex flex-column justify-content-center align-items-center">
                    <img
                        src="/aucun_photo.png"
                        loading="lazy"
                        style={{ borderRadius: "50%" }}
                        alt=""
                    />
                    <h3>{user.name}</h3>
                    <div>{user.bio?<div className="d-flex justify-content-center flex-column align-items-center"><h4 className="text-center mt-4 ">Bio </h4><br/><p style={{fontFamily:'monospace'}} className="text-center w-75 p-2">{user.bio}</p></div>:<span>no bio ...</span>}</div>
                </div>
            ) : (
                <div
                    style={{ height: "90dvh" }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <span className="spinner-border"></span>
                </div>
            )}

            
            <hr />
            <PostsUser blogs={blogs} />
        </div>
    );
};

export default Profile;
