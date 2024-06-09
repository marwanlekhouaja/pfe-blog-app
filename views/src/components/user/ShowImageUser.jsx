import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ShowImageUser() {
    const {user}=useContext(AppContext)
    return (
        <div>
            <div
                className="modal fade"
                id="exampleModal1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content rounded-pill">
                        {user.image?<img src={`http://localhost:8000/storage/${user.image}`} />:<img src="/aucun_photo.png" className="rounded" alt="pic" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowImageUser;
