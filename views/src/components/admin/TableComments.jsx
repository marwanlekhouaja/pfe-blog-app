import  { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function TableComments() {
    const { listComments } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listComments.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(listComments.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <table data-aos="fade-up" className="table table-light shadow mt-3 container text-center">
                <thead>
                    <tr>
                        <th>comment</th>
                        <th>creator name</th>
                        <th>blog id</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length !== 0 ? (
                        currentItems.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.comment}</td>
                                <td>{comment.user.name}</td>
                                <td>{comment.blog_id}</td>
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
                            <td colSpan={4}>no comments found!</td>
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

export default TableComments;
