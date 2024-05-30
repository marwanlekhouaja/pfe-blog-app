/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios"

const PostsUser = ({user,idUser}) => {
   const [posts,setPosts]=useState([])  

  useEffect(()=>{
    const fetchPostsUser=async ()=>{
        const res=await axiosClient.get(`api/postsuser/1`)
        if(res.status==200){
            setPosts(res.data)
        }
        else{
            console.log('error fetching posts of this user !')
        }
    }
    fetchPostsUser()
  },[])  

  console.log(posts)
  return (
    <div>
        {posts?.map((post)=>(
            <div key={post.id}>
                <h3>{post.title}</h3>
            </div>
        ))}
    </div>
  )
}

export default PostsUser