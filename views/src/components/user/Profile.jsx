/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import LayoutDashboardUser from "./LayoutDashboardUser";
import { UserStateContext } from "../../context/UserContext";

const Profile = () => {
  const [user,setUser]=useState([])
  const navigate=useNavigate()
  const context=useContext(UserStateContext)
  useEffect(() => {
    axiosClient
        .get("/api/user")
        .then((data) => setUser([data.data]))
    // if(!context.authenticated){
    //   navigate('/')
    // }
}, []);
  return (
    <div>
      <LayoutDashboardUser />
      {user.length!==0?user.map((u)=>(
        <div style={{height:'90vh'}} key={u.id} className="rounded w-50 m-auto shadow-md d-flex flex-column justify-content-center align-items-center">
          <img src='/aucun_photo.png' loading="lazy" style={{borderRadius:'50%'}} alt="" />
          <h3>{u.name}</h3>
          <p>email : {u.email}</p>
          <p>account created at {u.created_at}</p>
        </div>
      ))
      :
      <div style={{height:'90dvh'}} className="d-flex justify-content-center align-items-center"><span className="spinner-border"></span></div>
    }
    </div>
  )
}

export default Profile