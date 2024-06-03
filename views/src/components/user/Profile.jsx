/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { Link } from "react-router-dom";
import LayoutDashboardUser from "./LayoutDashboardUser";
import PostsUser from "./PostsUser";

const Profile = () => {
  const [user,setUser]=useState([])
  const [userId,setUserId]=useState(null)
  useEffect(() => {
    axiosClient
        .get("/api/user")
        .then((data) => setUser(data.data))

        user.map((u)=>setUserId(u.id))
    // if(!context.authenticated){
    //   navigate('/')
    // }
}, []);
  return (
    <div>
      <LayoutDashboardUser />
      {/* {user.length!==0?user.map((u)=>(
        <div key={u.id} className="mt-5  pt-4 rounded w-50 m-auto d-flex flex-column justify-content-center align-items-center">
          <img src='/aucun_photo.png' loading="lazy" style={{borderRadius:'50%'}} alt="" />
          <h3>{u.name}</h3>
        </div>
      ))
      :
      <div style={{height:'90dvh'}} className="d-flex justify-content-center align-items-center"><span className="spinner-border"></span></div>
    } */}

    <div className="d-flex align-items-center justify-content-center">
      <Link to='' className="bg-secondary text-dark text-decoration-none rounded-pill p-2 me-4">blogs</Link>
      <Link to='' className="bg-secondary text-dark text-decoration-none rounded-pill p-2">saved</Link>
    </div>
    <hr />
    <PostsUser user={user} idUser={userId} />
    </div>
  )
}

export default Profile