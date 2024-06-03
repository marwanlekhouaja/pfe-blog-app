/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosClient } from "../../api/axios"
import ContentOfCategory from "./ContentOfCategory"

const FilterBlogsByCategory = () => {
  const [blogs,setBlogs]=useState([])
  const {name}=useParams()


  useEffect(()=>{
    const filterByCategory=async ()=>{
      try{
        const res=await axiosClient.get(`/api/blogs/category/${name}`)
        if(res.status===200){
          setBlogs(res.data)
        }
      }
    catch(error){
      console.log(error)
    }
    }  
    filterByCategory()  
  },[])
  return (
    <div className="mt-5">
      <ContentOfCategory blogs={blogs} />
    </div>
  )
}

export default FilterBlogsByCategory