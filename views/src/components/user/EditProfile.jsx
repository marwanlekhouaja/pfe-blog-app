import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosClient } from "../../api/axios";

/* eslint-disable react/prop-types */

const schema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    bio: yup.string(),
});
function EditProfile({ user }) {
    const {
        register,
        handleSubmit,
        // formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const editData = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('bio', data.bio);

            // Check if an image file is provided and append it to the formData
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            }

            const res = await axiosClient.patch(`/api/users/${user.id}`, data);

            if (res.status === 200) {
                console.log("Profile edited successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.log("Failed to update profile because " + error);
        }
    };
    
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
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit profile
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={handleSubmit(editData)} >
                                name
                                <input
                                    type="text"
                                    {...register("name")}
                                    defaultValue={user.name}
                                    className="form-control"
                                />
                                email
                                <input
                                    type="text"
                                    {...register("email")}
                                    defaultValue={user.email}
                                    className="form-control"
                                />
                                bio
                                <input
                                    type="text"
                                    {...register("bio")}
                                    defaultValue={user.bio?user.bio:''}
                                    placeholder="type here something about you .."
                                    className="form-control"
                                />
                                image
                                <input
                                    type="file"
                                    {...register("image")}
                                    className="form-control"
                                />
                                <div className="d-flex align-items-center mt-2 justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-danger me-1"
                                        data-bs-dismiss="modal"
                                    >
                                        <i className="bi bi-x-circle-fill"></i>
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        // data-bs-dismiss="modal"
                                     >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
