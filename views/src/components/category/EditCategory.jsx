import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const schema = yup.object({
    name: yup.string().required(),
    type: yup.string().required(),
});
// eslint-disable-next-line react/prop-types
function EditCategory({ name, type, id }) {
    const { editCategory } = useContext(AppContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const edit = (data) => {
        const newData = { ...data, id };
        editCategory(newData);
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
                                Edit Category
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={handleSubmit(edit)}>
                                name
                                <input
                                    type="text"
                                    {...register("name")}
                                    defaultValue={name}
                                    className="form-control"
                                />
                                {errors.name && (
                                    <span className="text-danger">
                                        {errors.name.message}
                                        <br />
                                    </span>
                                )}
                                type
                                <input
                                    type="text"
                                    {...register("type")}
                                    defaultValue={type}
                                    className="form-control"
                                />
                                {errors.type && (
                                    <span className="text-danger">
                                        {errors.type.message}
                                        <br />
                                    </span>
                                )}
                                <input
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    value="edit category"
                                    className="btn btn-success mt-2"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;
