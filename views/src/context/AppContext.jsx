import { createContext, useEffect, useState } from "react";
import Routage from "../route/Routage";
import { axiosClient } from "../api/axios";
import { toast } from "sonner";

export const AppContext = createContext({ ListBlogs: [], user: {}, addComment: () => {}, addBlog: () => {}, saveBlog: () => {}, unsaveBlog: () => {},listCategories:[] ,deleteBlog:()=>{}});

const Context = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});
    const [listCategories,setListCategories]=useState([])

    useEffect(() => {

        // fetch user data
        const fetchDataUser = async () => {
            const res = await axiosClient.get("/api/user");
            if (res.status !== 401) {
                setUser(res.data);
            }
        };
        fetchDataUser();

        // fetch list blogs
        axiosClient.get("/api/blog").then((data) => setBlogs(data.data));

        //fetch list categories
        
        const fetchListCategories=async ()=>{
            const res=await axiosClient.get('/api/categories')
            if(res.status==200){
                setListCategories(res.data)
            }
        }
        fetchListCategories()


    }, []);

    const addComment = async (userid, idBlog, commentText) => {
        const res = await axiosClient.post("/api/commentaire", {
            user_id: userid,
            blog_id: idBlog,
            comment: commentText,
        });

        if (res.status === 201) {
            toast.success('Comment posted successfully!');

            const updatedBlogs = blogs.map(blog => {
                if (blog.id === idBlog) {
                    return {
                        ...blog,
                        comments: [...blog.comments, {
                            id: res.data.id,
                            blog_id: idBlog,
                            user_id: userid,
                            comment: commentText,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            user: { ...user }
                        }]
                    };
                }
                return blog;
            });

            setBlogs(updatedBlogs);
        } else {
            console.log("Failed to create comment");
        }
    };

    const detailBlog = async (titleBlog) => {
        const res = await axiosClient.get(`/api/blog/${titleBlog}`);
        if (res.status === 200) {
            setBlogs(res.data);
        } else {
            console.log("Blog not found!");
        }
    };

    const addBlog = async (blog) => {
        try {
            const res = await axiosClient.post('/api/blog', blog, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                toast.success('Blog created successfully!');
                axiosClient.get("/api/blog").then((data) => setBlogs(data.data));
            }
        } catch (error) {
            console.log('Failed to store blog because ' + error);
        }
    };

    const deleteBlog=async (idBlog)=>{
        const res=await axiosClient.delete(`/api/blog/${idBlog}`)
        if(res.status==200){
            axiosClient.get("/api/blog").then((data) => setBlogs(data.data));
            toast.info('blog deleted successfully !')
        }
        else{
            console.log(res.data)
        }
    }

    const saveBlog = async (blogId) => {
        try {
            const res = await axiosClient.post('/api/saves', { user_id: user.id, blog_id: blogId });
            if (res.status === 200) {
                const updatedBlogs = blogs.map(blog => {
                    if (blog.id === blogId) {
                        return {
                            ...blog,
                            saves: [...blog.saves, { user_id: user.id, blog_id: blogId }]
                        };
                    }
                    return blog;
                });
                setBlogs(updatedBlogs);
            }
        } catch (error) {
            console.log('Failed to save the blog because ' + error);
        }
    };

    const unsaveBlog = async (blogId) => {
        try {
            const res = await axiosClient.delete(`/api/saves/${user.id}/${blogId}`);
            if (res.status === 200) {
                const updatedBlogs = blogs.map(blog => {
                    if (blog.id === blogId) {
                        return {
                            ...blog,
                            saves: blog.saves.filter(save => save.user_id !== user.id)
                        };
                    }
                    return blog;
                });
                setBlogs(updatedBlogs);
            }
        } catch (error) {
            console.log('Failed to unsave the blog because ' + error);
        }
    };


    return (
        <AppContext.Provider value={{ ListBlogs: blogs, user, addComment, detailBlog, addBlog, saveBlog, unsaveBlog,listCategories ,deleteBlog}}>
            <Routage />
        </AppContext.Provider>
    );
};

export default Context;
