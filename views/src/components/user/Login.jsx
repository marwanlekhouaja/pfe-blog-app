/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { axiosClient } from "../../api/axios";
import { UserStateContext } from "../../context/UserContext";
import { axiosClient } from "../../api/axios";

const schema = yup.object({
    email: yup.string().required().email().max(30),
    password: yup.string().required().min(6).max(30),
});

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(UserStateContext);
    console.log(context);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting ,isValid},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const auth = async (data) => {
        // const response=await context.login(data.email,data.password)
        try {
            await axiosClient.get("/sanctum/csrf-cookie");
            const response = await axiosClient.post("/login", data);
            // Handle response
            if (response.status === 204) {
                context.authenticated == true;
                context.setAuthenticated == true;
                setTimeout(() => {
                    toast.success("login successfully !");
                }, 500);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }
        } catch (error) {
            // Handle error
            console.log("Login error:", error);
            setError("email", {
                message: error.response.data.errors.email[0],
            });
        }
    };

    return (
        <div>
            <header className="d-flex align-items-center justify-content-between">
                <div className="logo d-flex align-items-center">
                     <img src="/logo.png" width={45} height={45} alt="logo" />
                     <h5 className="mt-2">Blogify</h5>
                </div>
                <Link to='/register' className="btn btn-dark mt-2 me-2 text-light">Sign up</Link>
            </header>
            <hr/>
            <div
                style={{ height: "80vh" }}
                className="d-flex justify-content-center  align-items-center flex-column"
            >
                <form
                    onSubmit={handleSubmit(auth)}
                    className="bg-white flex flex-col col-8 col-md-4 p-2"
                >
                    <h1 style={{fontFamily:'monospace'}} className="mb-3">Sign in to Blogify</h1>
                    <Toaster richColors duration={1200} position="top-center" />
                    <label style={{ fontFamily: "monospace" }}>Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="form-control bg-light"
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
                        className="form-control bg-light"
                    />
                    {errors.password && (
                        <span className="text-danger">
                            {errors.password.message}
                            <br />
                        </span>
                    )}
                    <button
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        className="btn btn-dark mt-2 w-25 text-center justify-content-center align-items-center d-flex"
                    >
                        <span className="text-center">Sign in</span>
                        {isSubmitting && (
                            <span
                                style={{ width: "20px", height: "20px" }}
                                className=" progress-bar-animated spinner-border ms-2"
                            ></span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
