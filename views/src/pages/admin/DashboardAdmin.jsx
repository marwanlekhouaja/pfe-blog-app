import TableBlogs from "../../components/admin/TableBlogs";
import TableUsers from "../../components/admin/TableUsers";
import TableCategories from "../../components/admin/TableCategories";
import { useContext, useState } from "react";
import TableComments from "../../components/admin/TableComments";
import { AppContextAdmin } from "../../context/AppContextAdmin";

const DashboardAdmin = () => {

    const [showListCategories,setShowListCategories]=useState(false)
    const [showListUsers,setShowListUsers]=useState(false)
    const [showListBlogs,setShowListBlogs]=useState(true)
    const [showListComments,setShowListComments]=useState(false)

    const context=useContext(AppContextAdmin)
    console.log(context)

    const handleShowBlogs=()=>{
        setShowListBlogs(true)
        setShowListCategories(false)
        setShowListUsers(false)
        setShowListComments(false)
    }

    const handleShowUsers=()=>{
        setShowListBlogs(false)
        setShowListCategories(false)
        setShowListUsers(true)
        setShowListComments(false)
    }

    const handleShowCategories=()=>{
        setShowListBlogs(false)
        setShowListCategories(true)
        setShowListUsers(false)
        setShowListComments(false)
    }

    const handleShowComments=()=>{
        setShowListBlogs(false)
        setShowListCategories(false)
        setShowListUsers(false)
        setShowListComments(true)
    }

   
    return (
        <div className="d-flex">
            <div
                style={{ minHeight: "100dvh" }}
                className="sideBar bg-dark text-light col-2 p-3"
            >
                <div onClick={handleShowBlogs}><button className="btn btn-light m-1">Table Blogs</button></div>
                <div onClick={handleShowCategories}><button className="btn btn-light m-1">Table Categories</button></div>
                <div onClick={handleShowUsers}><button className="btn btn-light m-1">Table Users</button></div>
                <div onClick={handleShowComments}><button className="btn btn-light m-1">Table Comments</button></div>
            </div>
            <div className="tables col-10 container">
                {showListBlogs&&<TableBlogs/>}
                {showListUsers&&<TableUsers />}
                {showListCategories&&<TableCategories />} 
                {showListComments&&<TableComments />}               
            </div>
        </div>
    );
};

export default DashboardAdmin;
