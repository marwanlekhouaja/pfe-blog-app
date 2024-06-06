import * as yup from "yup";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import { axiosClient } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
    password_confirmation: yup.string().required().min(3),
});

const Register = () => {
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

    const createAccount = async (data) => {
        try {
            if(data.password_confirmation == data.password){
                const res = await axiosClient.post("/register", data);
                if (res.status === 204) {
                toast.success("account created successfully !");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            }
            }
            else{
                setError('password_confirmation',{
                    message:'password is not matched'
                })
            }
        } catch (error) {
            console.log("error store data because " + error);
        }
    };
    return (
        <>
            <header className="d-flex align-items-center justify-content-between">
                <div className="logo d-flex align-items-center">
                    <img src="/logo.png" width={45} height={45} alt="logo" />
                    <h5 className="mt-2">Blogify</h5>
                </div>
                <Link
                    to="/"
                    className="rounded-pill btn btn-light mt-2 me-2 text-dark"
                >
                    Sign in
                </Link>
            </header>
            <hr />
            <div
                style={{ height: "80dvh" }}
                className="d-flex align-items-center justify-content-center"
            >
                <Toaster richColors position="top-center" duration={1200} />
                <form
                    action=""
                    onSubmit={handleSubmit(createAccount)}
                    className="p-2 col-10 col-md-5 "
                >
                    <h2 style={{fontFamily:'monospace'}}>Create Account in blogify</h2>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="enter your fullname here"
                        className="form-control p-2 mb-2 mt-2"
                    />
                    {errors.name && (
                        <span className="text-danger">
                            {errors.name.message}
                            <br />
                        </span>
                    )}
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="enter your email here"
                        className="form-control mt-3 mb-2"
                    />
                    {errors.email && (
                        <span className="text-danger">
                            {errors.email.message}
                            <br />
                        </span>
                    )}
                    <input
                        type="password"
                        {...register("password")}
                        placeholder="enter your password here"
                        className="form-control mt-3 "
                    />
                    {errors.password && (
                        <span className="text-danger">
                            {errors.password.message}
                            <br />
                        </span>
                    )}
                    <input
                        type="password"
                        {...register("password_confirmation")}
                        className="form-control mt-3 mb-3"
                        placeholder="confirm your password here"
                    />
                    {errors.password_confirmation && (
                        <span className="text-danger">
                            {errors.password_confirmation.message}
                            <br />
                        </span>
                    )}
                    <div className="check d-flex align-items-center">
                      <input type="checkbox" className="me-2" />
                      <span>I agree to the Terms of Service and Privacy Policy (optional)</span>
                    </div>
                    {/* <input type="submit" value='register' className="btn btn-dark mt-2"/> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn rounded-pill btn-dark w-100 mt-2 d-flex align-items-center justify-content-center"
                    >
                        <span>Create Account</span>
                        {isSubmitting && (
                            <span className=" spinner-border ms-2"></span>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;
