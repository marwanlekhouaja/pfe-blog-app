/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { axiosClient } from "../../api/axios";
import {toast,Toaster} from 'sonner'
import { useFetcher } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const CommentModel = () => {

    const refComment=useRef()
    const [comments,setComments]=useState([])

    // eslint-disable-next-line react/prop-types
    // const commentOnBlog=async ()=>{
    //     const data={blog_id:idBlog,user_id:user.id,comment:refComment.current.value}
    //     const res=await axiosClient.post('/api/commentaire',data)
    //     toast.success('comment posted successfully !')
    //     refComment.current.value=''        
           
    // }

    useEffect(()=>{
        // const fetchComments=async ()=>{
        //     const res=await axiosClient.get('/api/commentaire')
        //     res.status===200&&setComments()
        //     if(res.status===200){
        //         if(res.data.filter(c=>c.blog_id==idBlog)){
        //             setComments(res.data.filter(c=>c.blog_id==idBlog))
        //         }
        //     }
        // } 
        // fetchComments()
    },[])


    return (
        <div>
            <Toaster richColors duration={1200} position="top-center" />


<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default CommentModel;
