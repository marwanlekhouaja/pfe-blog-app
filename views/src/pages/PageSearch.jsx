/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import LayoutDashboardUser from "../components/user/LayoutDashboardUser";
import { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import ContentPageSearch from "../components/search/ContentPageSearch";
import AOS from "aos";
import "aos/dist/aos.css";
const PageSearch = () => {
    const { search } = useParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogsOfSearch = async () => {
            const res = await axiosClient.get(`api/blogs/${search}`);
            if (res.status == 200) {
               setBlogs(res.data)
            } else {
                console.log("failed to fetch data from search !");
            }
        };
        fetchBlogsOfSearch();
        AOS.init()
    },[]);

    return (
        <div>
            <LayoutDashboardUser />
            <div className="mt-2 pt-3 container">
                <h1
                    style={{ fontFamily: "monospace" }}
                >
                   <span className="text-secondary mb-3">Results for </span>  {search}
                </h1>
                <ContentPageSearch blogs={blogs} />
            </div>
        </div>
    );
};

export default PageSearch;
