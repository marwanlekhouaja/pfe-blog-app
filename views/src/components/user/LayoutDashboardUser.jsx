import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { toast } from "sonner";
import EditProfile from "./EditProfile";

const LayoutDashboardUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [searchValue, setSearchValue] = useState("");

    const logout = async () => {
        try {
            const response = await axiosClient.post("/logout");
            if (response.status === 204) {
                toast.info("You are logged out now!");
                window.localStorage.removeItem("ACCESS_TOKEN");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            toast.error("Failed to log out. Please try again.");
        }
    };

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const res = await axiosClient.get("/api/user");
                if (res.status === 401) {
                    navigate("/");
                } else {
                    setUser(res.data);
                }
            } catch (error) {
                navigate("/");
            }
        };
        fetchDataUser();
    }, [navigate]);

    return (
        <>
            <div style={{ paddingBottom: "50px" }}>
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: 999,
                        backgroundColor: "white",
                        marginTop: "-1.2%",
                    }}
                    className="d-flex p-3 justify-content-between align-items-center"
                >
                    <nav className="mt-2">
                        <form
                            action={`/search/${searchValue}`}
                            className="d-flex align-items-center"
                        >
                            <Link to="/dashboard">
                                <img
                                    src="/logo.png"
                                    loading="lazy"
                                    width={50}
                                    height={50}
                                    alt="Logo"
                                />
                            </Link>

                            <input
                                type="search"
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="bg-light p-1 rounded-lg focus:border-gray"
                                placeholder="Search for something..."
                            />
                            <button type="submit" className="btn btn-dark ms-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </form>
                    </nav>
                    <div className="d-flex align-items-center">
                        <Link
                            to="/blog/create"
                            className="text-decoration-none d-flex align-items-center text-dark me-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-square mt-1 me-1"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            <span>Write</span>
                        </Link>
                        {/* <Link to={`/${user.name}/profile`}>
                            <img
                                style={{ borderRadius: "50%" }}
                                src="/aucun_photo.png"
                                loading="lazy"
                                width={50}
                                height={100}
                                className=""
                                alt="Profile"
                            />
                        </Link> */}
                        {/* <button onClick={logout} className="btn btn-light ms-2">
                            <i className="bi bi-box-arrow-right"></i>
                        </button> */}
                        <div className="dropdown">
                        {/* <Link to={`/${user.name}/profile`} className="dropdown-toggle">
                            <img
                                style={{ borderRadius: "50%" }}
                                src="/aucun_photo.png"
                                loading="lazy"
                                width={50}
                                height={100}
                                className=""
                                alt="Profile"
                            />
                        </Link> */}
                            <span
                                className="dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {user.name}
                            </span>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link
                                        to={`/${user.name}/profile`}
                                        className="dropdown-item"
                                    >
                                        profile
                                    </Link>
                                    <span
                                        className="dropdown-item"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        href="#"
                                    >
                                        edit
                                    </span>
                                </li>
                                <li>
                                    <button onClick={logout} className="ms-3">
                                        logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <EditProfile user={user} />
        </>
    );
};

export default LayoutDashboardUser;
