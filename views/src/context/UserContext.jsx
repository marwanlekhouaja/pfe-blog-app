/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createContext, useState } from "react";
import UserApi from "../services/Api/User/UserApi";
import { useNavigate } from "react-router-dom";

export const UserStateContext=createContext({
    user:{},
    setUser:()=>{},
    authenticated:false, 
    setAuthenticated:null,
    login:(email,password)=>{},
    logout:()=>{}
})

// eslint-disable-next-line react/prop-types
const UserContext=({children})=>{
    const [user,setUser]=useState([])
    const [authenticated,setAuthenticated]=useState(false)
    const login=async (email,password)=>{
        await UserApi.getCsrf()
        return await UserApi.login(email,password)
        // try {
        //     const response = await UserApi.login(email,password)
        //     // Handle response
        //     if (response.status === 204) {
        //         setAuthenticated(true)               
        //         setTimeout(() => {
        //             toast.success("login successfully !");
        //         }, 500);
        //         setTimeout(() => {
        //             navigate("/dashboard");
        //         }, 1500);
        //     }
        // } catch (error) {
        //     // Handle error
        //     console.error("Login error:", error);
        //     // setError("email", {
        //     //     message: error.response.data.errors.email[0],
        //     // });
        // }
    }
    const logout=()=>{}
    return <>
    <UserStateContext.Provider value={{
        user,
        login,
        authenticated,
        setAuthenticated,
        logout
    }}>
        {children}
    </UserStateContext.Provider>
    </>   
}
export default UserContext

