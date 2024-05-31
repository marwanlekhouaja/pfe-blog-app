/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { axiosClient } from "../../api/axios";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const CommentModel = ({idBlog,idUser,comments}) => {
  const [comment,setComment]=useState('')
  console.log(comments)

  const createComment=async ()=>{
    const res=await axiosClient.post('/api/commentaire',{user_id:idUser,blog_id:idBlog,comment})
    if(res.status===201){
      console.log('comment created successfully !')
      setComment('')
    }
    else{
      console.log('failed to create comment')
    }
  }
    return (
        <div>
            
            <div
                className="modal fade"
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {comments?comments.map((c)=>(
                              <div key={c.id}>
                                <p>{c.comment}</p>
                                <hr />
                              </div>
                            )):<span>no comments in this blog</span>}
                            <form className="d-flex">
                                <input type="text" onChange={e=>setComment(e.target.value)} className="form-control" placeholder="enter your comment here" />
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={createComment}><i className="ms-1 bi bi-chat"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModel;
