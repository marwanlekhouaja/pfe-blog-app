/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
// eslint-disable-next-line react/prop-types
const CommentModel = ({ idBlog, idUser }) => {
    const [comment, setComment] = useState("");
    const context=useContext(AppContext)
    const createComment = async () => {
        context.addComment(context.user.id,idBlog,comment)
    };
    return (
        <div>
            <form className="d-flex">
                <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                    placeholder="enter your comment here"
                />
                <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                    onClick={createComment}
                >
                    <i className="ms-1 bi bi-chat"></i>
                </button>
            </form>
        </div>
    );
};

export default CommentModel;
