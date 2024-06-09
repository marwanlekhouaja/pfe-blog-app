import  { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Toaster } from "sonner";
import EditCategory from "../category/EditCategory";

function TableCategories() {
    const { listCategories, removeCategory } = useContext(AppContext);
    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [id, setId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(listCategories.length / itemsPerPage);

    // Calculate the current items based on the current page
    const currentItems = listCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteCategory = (id) => {
        removeCategory(id);
        // Refresh the current page to handle any potential changes in pagination
        setCurrentPage((prevPage) => {
            const newTotalPages = Math.ceil((listCategories.length - 1) / itemsPerPage);
            return prevPage > newTotalPages ? newTotalPages : prevPage;
        });
    };

    const updateCategory = (category) => {
        setType(category.type);
        setName(category.name);
        setId(category.id);
    };

    return (
        <div>
            <Toaster richColors position="top-center" duration={1000} />
            <table data-aos="fade-up" className="table table-light shadow mt-3 container text-center">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>type</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length !== 0 ? (
                        currentItems.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.type}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteCategory(category.id)}
                                    >
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                    <button
                                        className="btn btn-success ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => updateCategory(category)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>no categories found!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <nav>
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
            <EditCategory name={name} id={id} type={type} />
        </div>
    );
}

export default TableCategories;
