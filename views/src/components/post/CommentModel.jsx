/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import {toast,Toaster} from 'sonner'
// eslint-disable-next-line react/prop-types
const CommentModel = ({user,commentaires,idBlog}) => {

    const [comment,setComment]=useState('')
    const [comments,setComments]=useState([])

    console.log(comments)

    // eslint-disable-next-line react/prop-types
    const commentOnBlog=async ()=>{
        // const data={blog_id:idBlog,user_id:user.id,comment}
      
           

    }

    useEffect(()=>{
        axiosClient.get('/api/commentaire').then(data=>setComments(data.data))
    })

    return (
        <div>
            <Toaster richColors duration={1200} position="top-center" />
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
                            {comments.length!==0?comments.map((c)=>{
                                c.blog_id==idBlog&&
                                <div key={c.id} className="card bg-light p-2 m-2">
                                    <p>{c.comment}</p>                                                                        
                                </div>
                            }):<h4>no comments exists on this blog !</h4>}
                            <hr />
                            <input
                                type="text"
                                onChange={e=>setComment(e.target.value)}
                                placeholder="type your comment here"
                                className="form-control"
                            />
                            <div className="d-flex justify-content-end mt-2">
                                <button
                                    type="button"
                                    className="btn btn-danger me-2"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    onClick={commentOnBlog}
                                    className="btn btn-success"
                                >
                                    comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModel;
