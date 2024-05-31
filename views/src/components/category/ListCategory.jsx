import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { Link } from "react-router-dom";

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axiosClient.get("/api/list_categories");
            if (res.status == 200) {
                setCategories(res.data);
            }
        };
        fetchCategories();
    }, []);
    return (
        <>
            <div style={{flexWrap:'wrap'}} className="d-flex ">

                {categories.map((category, index) => (
                    <div
                        key={index}
                        style={{ height: "40px" }}
                        className="bg-light rounded-pill text-center  p-2 m-2"
                    >
                        <Link
                            className="text-dark text-decoration-none"
                            to={`/category/${category.type}`}
                        >
                            {category.type}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListCategory;
