/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import { axiosClient } from "../api/axios";
import Routage from "../route/Routage";

// eslint-disable-next-line no-undef
export const AppContextAdmin=createContext({blogs:[],categories:[],comments:[],users:[]})

const Context=()=>{
    const [blogs,setBlogs]=useState([])
    const [categories,setCategories]=useState([])
    const [comments,setComments]=useState([])
    const [users,setUsers]=useState([])

    useEffect(()=>{
        const fetchListBlogs=async ()=>{
            const res=await axiosClient.get('/api/categories')
            if(res.status==200){
                setBlogs(res.data)
            }
        }
        fetchListBlogs()

        const fetchListUsers=async ()=>{
            const res=await axiosClient.get('/api/users')
            if(res.status===200){
                setUsers(res.data)
            }
        }
        fetchListUsers()
        const fetchListComments=async ()=>{
            const res=await axiosClient.get('/api/commentaire')
            if(res.status===200){
                setComments(res.data)
            }
        }
        fetchListComments()
        const fetchListCategories=async ()=>{
            const res=await axiosClient.get('/api/categories')
            if(res.status==200){
                setCategories(res.data)
            }
        }
        fetchListCategories()

    },[])
    return (
        <>
        <AppContextAdmin.Provider value={{blogs:[{id:1,name:'ehdheh'},{id:2,name:'sjjdjeueu'}],categories,comments,users}}>
            <Routage />
        </AppContextAdmin.Provider>
        </>
    )
}

export default Context