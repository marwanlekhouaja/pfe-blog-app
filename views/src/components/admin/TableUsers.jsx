import  { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function TableUsers() {
    const { users } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <table data-aos="fade-up" className="table table-light shadow mt-3 container text-center">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>image</th>
                        <th>bio</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length !== 0 ? (
                        currentItems.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.image ? (
                                        <img
                                            width={60}
                                            src={`http://localhost:8000/storage/${user.image}`}
                                        />
                                    ) : (
                                        "aucun photo"
                                    )}
                                </td>
                                <td>{user.bio ? user.bio.slice(0, 30) + ' ...' : <span>no bio ..</span>}</td>
                                <td>
                                    <button className="btn btn-danger">
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                    <button className="btn btn-success ms-2">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>no users found!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <nav>
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default TableUsers;
