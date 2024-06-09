import  { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

function TableBlogs() {
    const { ListBlogs } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ListBlogs.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(ListBlogs.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <table data-aos="fade-up" className="table table-light shadow mt-3 container text-center">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>description</th>
                        <th>image</th>
                        <th>number comments</th>
                        <th>category</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length !== 0 ? (
                        currentItems.map((blog) => (
                            <tr key={blog.id}>
                                <td>
                                    {blog.title.length > 20
                                        ? blog.title.slice(0, 20) + "..."
                                        : blog.title}
                                </td>
                                <td>
                                    {blog.body.length > 50
                                        ? blog.body.slice(0, 50) + "..."
                                        : blog.body}
                                </td>
                                <td>
                                    {blog.image ? (
                                        <img
                                            width={60}
                                            src={`http://localhost:8000/storage/${blog.image}`}
                                        />
                                    ) : (
                                        "null"
                                    )}
                                </td>
                                <td>{blog.comments_count}</td>
                                <td>{blog.category.type}</td>
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
                            <td colSpan={6}>no blogs found!</td>
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

export default TableBlogs;
