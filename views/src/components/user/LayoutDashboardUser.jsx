/* eslint-disable react-hooks/exhaustive-deps */
import {  useContext, useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { toast } from "sonner";
import { UserStateContext } from "../../context/UserContext";

const LayoutDashboardUser = () => {
    const navigate=useNavigate()
    const context=useContext(UserStateContext)
    const [user,setUser]=useState([])
    const [searchValue,setSearchValue]=useState('')
    const logout=async ()=>{
        const response=await axiosClient.post('/logout')
        if(response.status===204){
            toast.info('you are logout right now !')
            context.authenticated==false
            context.setAuthenticated==false
            setTimeout(()=>{
                navigate('/')
            },1000)
        }
    }

    useEffect(() => {
        axiosClient
            .get("/api/user")
            .then((data) => setUser(data.data))
    //    if(!context.authenticated){
    //     navigate('/')
    //    }
    }, []);
    return (
        <>
            <div style={{position:'fixed',width:'100%',zIndex:'999',backgroundColor:'white',marginTop:'-2.3%',marginBottom:'80px'}} className="d-flex p-3 justify-content-between  align-items-center ">
                <nav>
                    <form
                        action={`/search/?${searchValue}`}
                        className="d-flex align-items-center"
                    >
                        <Link to="/dashboard">
                            <img
                                src="/logo.png"
                                loading="lazy"
                                width={50}
                                height={50}
                                alt=""
                            />
                        </Link>
                        <input
                            type="search"
                            onChange={e=>setSearchValue(e.target.value)}
                            className="bg-light p-1 rounded-lg focus:border-gra"
                            placeholder="search for something ..."
                        />
                        <button type="submit" className="btn btn-dark ms-1 ">
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
                </nav>
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
                    <Link to={`/${user.name}/profile`} >
                        <img
                            style={{ borderRadius: "50%" }}
                            src="/aucun_photo.png"
                            loading="lazy"
                            width={50}
                            height={100}
                            className=""
                            alt="pic"
                        />
                    </Link>
                    <button onClick={logout} className="btn btn-dark ms-2">logout</button>

                </div>
            </div>
            <hr />
        </>
    );
};

export default LayoutDashboardUser;
