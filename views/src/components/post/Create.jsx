import "bootstrap/dist/css/bootstrap.css";
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast,Toaster} from 'sonner'
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";

const schema=yup.object({
    title:yup.string().required().min(3),
    body:yup.string().required().min(3),
})
const Create = () => {
    const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({
        mode:'onTouched',
        resolver:yupResolver(schema)
    })

    const createBlog=async (data)=>{
        const blog={...data,image:data.image[0].name,creatorId:3}
        try{
            const res=await axiosClient.post('/api/blog',blog);
            if(res.status==200){
                console.log(blog)
                toast.success('blog created successfully !')
            }
            setTimeout(()=>{
                navigate('/dashboard')
            },2300)
            
        }
        catch(error){
            console.log('failed to store blog because '+error)
        }
    }
    return (
        <div style={{height:'90vh'}} className="d-flex justify-content-center align-items-center">
            <Toaster richColors position="top-center" duration={1300} />
            <form action="" onSubmit={handleSubmit(createBlog)} className=" p-2 m-auto shadow w-50 rounded"  >
                <h2 className="text-center font-mono">Create your own blog</h2>
                title
                <input className="form-control" type="text" {...register('title')} />
                {errors.title&&<span className="text-danger">{errors.title.message}<br/></span>}
                image
                <input type="file" {...register('image')} className="form-control" />
                {errors.image&&<span className="text-danger">{errors.image.message}<br/></span>}
                body
                <textarea {...register('body')} className="form-control"></textarea>
                {errors.body&&<span className="text-danger">{errors.body.message}<br/></span>}
                {/* <input type="submit" disabled={isSubmitted} value='create blog' className="btn btn-dark mt-2" /> */}
                <button type="submit" disabled={isSubmitting} className="btn btn-dark mt-2">
                    <span>create</span>
                    {isSubmitting&&<span style={{height:'18px',width:'18px'}} className="ms-2 spinner-border"></span>}
                </button>
            </form>
        </div>
    );
};

export default Create;
