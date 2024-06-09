import { createContext, useEffect, useState } from "react";
import Routage from "../route/Routage";
import { axiosClient } from "../api/axios";
import { toast } from "sonner";
import AOS from 'aos' 
export const AppContext = createContext({ ListBlogs: [],listComments:[],users:[] ,user: {},removeCategory:()=>{},editCategory:()=>{}, dataUser:[],addComment: () => {}, addBlog: () => {}, saveBlog: () => {}, unsaveBlog: () => {},listCategories:[] ,deleteBlog:()=>{}});

const Context = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});
    const [listCategories,setListCategories]=useState([])
    const [dataUser,setDataUser]=useState([])
    const [users,setUsers]=useState([])
    const [listComments,setListComments]=useState([])

    useEffect(() => {

        // fetch user data
        AOS.init()
        const fetchDataUser = async () => {
            const res = await axiosClient.get("/api/user");
            if (res.status !== 401) {
                setUser(res.data);
            }
        };
        fetchDataUser();

        const fetchListUsers=async ()=>{
            const res=await axiosClient.get('/api/users')
            if(res.status===200){
                setUsers(res.data)
            }
        }
        fetchListUsers()

        const fetchListComments=async ()=>{
            const res=await axiosClient.get('/api/commentaire')
            if(res.status===200){
                setListComments(res.data)
            }
        }
        fetchListComments()

        const fetchPostsAndSavesUser = async () => {
            try {
                const data = await axiosClient.get("/api/user");
                const res = await axiosClient.get(`api/users/${data.data.id}`);
                if (res.status == 200) {
                    setDataUser(res.data);
                }
            } catch (error) {
                console.log(
                    "error fetching posts of this user ! because " + error
                );
            }
        };
        fetchPostsAndSavesUser();

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

    const addBlog = async (listBlogs) => {
        try {
            setBlogs(listBlogs);
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

    // crud operation of category
    const removeCategory = async (idCategory) => {
        try {
            const res = await axiosClient.delete(`/api/commentaire/${idCategory}`);
            if (res.status === 200) {
                // Fetch the updated categories list after deletion
                const updatedResponse = listCategories.filter(category=>category.id!=idCategory);
                setListCategories(updatedResponse);
                toast.info('Category deleted successfully!');
            }
        } catch (error) {
            console.log("Failed to delete category:", error);
            toast.error('Failed to delete category');
        }
    };

    const editCategory = async (category) => {
        try {
            const res = await axiosClient.patch(`/api/commentaire/${category.id}`, category);
            if (res.status === 200) {
                const updatedResponse =listCategories.map(c=>{
                    if(c.id==category.id){
                        return {...c,name:category.name,type:category.type}
                    }
                    return c
                })
                setListCategories(updatedResponse);
                toast.success('Category edited successfully!');
            }
        } catch (error) {
            console.log("Failed to edit category:", error);
            toast.error('Failed to edit category');
        }
    };


    return (
        <AppContext.Provider value={{ ListBlogs: blogs, user,editCategory,removeCategory, addComment,listComments, detailBlog,users, addBlog, saveBlog,dataUser, unsaveBlog,listCategories ,deleteBlog}}>
            <Routage />
        </AppContext.Provider>
    );
};

export default Context;
