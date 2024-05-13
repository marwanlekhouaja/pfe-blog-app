import { Link } from "react-router-dom";

const LayoutDashboardUser = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center m-2">
                <div>
                    <form action="/search" className="d-flex align-items-center" method="get">
                        <img src="/logo.png" width={50} height={50} alt="" />
                        <input
                            type="search"
                            className="form-control "
                            placeholder="search for somthing ..."
                        />
                        <button type="submit" className="btn btn-dark ms-1 p-2">
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
                </div>
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
                        <span>write</span>
                    </Link>
                    <Link to={`/marwan/profile`}>
                        <img
                            style={{ borderRadius: "50%" }}
                            src="/aucun_photo.png"
                            width={50}
                            height={100}
                            className=""
                            alt="pic"
                        />
                    </Link>
                </div>
            </div>
            <hr />
        </>
    );
};

export default LayoutDashboardUser;
