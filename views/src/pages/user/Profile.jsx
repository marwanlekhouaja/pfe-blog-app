/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import LayoutDashboardUser from "../../components/user/LayoutDashboardUser";
import BlogsUser from "../../components/user/BlogsUser";
import BlogsSavesUser from "../../components/user/BlogsSavesUser";
import { Link } from "react-router-dom";
import SectionAboutUser from "../../components/user/SectionAboutUser";
import ShowImageUser from "../../components/user/ShowImageUser";

const Profile = () => {
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);

    const [showBlogs, setShowBlogs] = useState(true);
    const [showSaves, setShowSaves] = useState(false);
    const [showSectionAbout, setShowAboutSection] = useState(false);

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
                    setData(res.data);
                }
            } catch (error) {
                console.log(
                    "error fetching posts of this user ! because " + error
                );
            }
        };
        fetchPostsUser();
    }, []);

    const handleShowSaves = () => {
        setShowSaves(true);
        setShowAboutSection(false);
        setShowBlogs(false);
    };
    const hanldeShowBlogs = () => {
        setShowBlogs(true);
        setShowAboutSection(false);
        setShowSaves(false);
    };

    const handleShowAbout = () => {
        setShowAboutSection(true);
        setShowBlogs(false);
        setShowSaves(false);
    };

    return (
        <div>
            <LayoutDashboardUser />
            {user.length !== 0 ? (
                <div className="mt-5 pt-4 rounded col-10 col-md-8 m-auto d-flex flex-column justify-content-center align-items-center">
                    {user.image ? (
                        <img
                            src={`http://localhost:8000/storage/${user.image}`}
                            loading="lazy"
                            style={{
                                borderRadius: "50%",
                                width: "200px",
                                height: "200px",
                                cursor: "pointer",
                            }}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal1"
                        />
                    ) : (
                        <img
                            src="/aucun_photo.png"
                            loading="lazy"
                            style={{
                                borderRadius: "50%",
                                width: "200px",
                                height: "200px",
                                cursor: "pointer",
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal1"
                            alt=""
                        />
                    )}
                    <h3>{user.name}</h3>
                </div>
            ) : (
                <div
                    style={{ height: "90dvh" }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <span className="spinner-border"></span>
                </div>
            )}

            <div className="d-flex align-items-center justify-content-center">
                <Link
                    className="text-decoration-none btn btn-light text-dark"
                    onClick={hanldeShowBlogs}
                >
                    blogs
                </Link>
                <Link
                    className="text-decoration-none btn btn-light text-dark ms-3"
                    onClick={handleShowAbout}
                >
                    Bio
                </Link>
                <Link
                    className="text-decoration-none btn btn-light ms-3 text-dark"
                    onClick={handleShowSaves}
                >
                    saves blogs
                </Link>
            </div>
            {showBlogs && <BlogsUser blogs={data.blogs} />}
            {showSaves && <BlogsSavesUser saves={data.saves} />}
            {showSectionAbout && (
                <SectionAboutUser about={user.bio ? user.bio : ""} />
            )}

            <ShowImageUser />
        </div>
    );
};

export default Profile;
