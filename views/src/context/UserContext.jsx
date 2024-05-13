import { createContext, useContext, useState } from "react";

const UserStateContext=createContext({
    user:{},
    setUser:()=>{},
    logout:()=>{}
})

// eslint-disable-next-line react/prop-types
const UserContext=({children})=>{
    const [user,setUser]=useState([])
    const logout=()=>{}
    return <>
    <UserStateContext.Provider value={{
        user,
        setUser,
        logout
    }}>
        {children}
    </UserStateContext.Provider>
    </>   
}
export default UserContext

// eslint-disable-next-line react-refresh/only-export-components, react-hooks/rules-of-hooks
export const useUserContext=useContext(UserStateContext)