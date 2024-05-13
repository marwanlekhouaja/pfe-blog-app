/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosClient } from "../../api/axios";

const schema = yup.object({
    email: yup.string().required().email().max(30),
    password: yup.string().required().min(6).max(30),
});

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (window.localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/dashboard");
        }
    }, []);

    const auth = async (data) => {
        try {
                       
            const response = await axiosClient.post("/login", data);
            // Handle response
            if (response.status === 204) {
                await axiosClient.get('/sanctum/csrf-cookie',{
                    withCredentials:true
                });
                window.localStorage.setItem("ACCESS_TOKEN", "eedmdikehj");
                setTimeout(() => {
                    toast.success("login successfully !");
                }, 500);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }
        } catch (error) {
            // Handle error
            console.error("Login error:", error);
            setError("email", {
                message: error.response.data.errors.email[0],
            });
        }
    };

    return (
        <div
            style={{ height: "90vh" }}
            className="d-flex justify-content-center align-items-center flex-column"
        >
            <form
                onSubmit={handleSubmit(auth)}
                className="shadow rounded flex flex-col col-8 col-md-5 p-2"
            >
                <Toaster richColors duration={1200} position="top-center" />
                <h2 style={{ fontFamily: "monospace" }}>
                    charge clientèle login
                </h2>
                <label style={{ fontFamily: "monospace" }}>Email</label>
                <input
                    type="email"
                    {...register("email")}
                    className="form-control"
                />
                {errors.email && (
                    <span className="text-danger">
                        {errors.email.message}
                        <br />
                    </span>
                )}
                <label style={{ fontFamily: "monospace" }}>Password</label>
                <input
                    type="password"
                    {...register("password")}
                    className="form-control"
                /> <br />
                {errors.password && (
                    <span className="text-danger">
                        {errors.password.message}
                        <br />
                    </span>
                )}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-dark mt-2 w-25 text-center d-flex"
                >
                    <span className="text-center">login</span>
                    {isSubmitting && (
                        <span
                            style={{ width: "20px", height: "20px" }}
                            className=" progress-bar-animated spinner-border ms-2"
                        ></span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;
