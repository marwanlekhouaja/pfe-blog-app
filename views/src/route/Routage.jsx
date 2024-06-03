import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Create from '../components/blog/Create'
import Profile from '../components/user/Profile'
import DashboardAdmin from '../pages/admin/DashboardAdmin'
import Login from '../pages/user/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/user/Register'
import SearchPost from '../pages/PageSearch'
import Dashboard from '../pages/user/Dashboard'
import FilterBlogsByCategory from '../components/category/FilterBlogsByCategory'
import DetailBlog from '../components/blog/DetailBlog'
const route=createBrowserRouter([
    {
        path:'/dashboard',
        element:<Dashboard />
    },{
        path:'/',
        element:<Login />
    },{
      path:'/blog/create',
      element:<Create />
    },{
      path:'/:name/profile',
      element:<Profile />
    },{
      path:'/admin/dashboard',
      element:<DashboardAdmin />
    },
    {
      path:'/register',
      element:<Register />

    },
    {
      path:'/search/:search',
      element:<SearchPost />
    },
    {
      path:'*',
      element:<NotFound />
    },
    {
      element:<FilterBlogsByCategory />,
      path:'/category/:name'
    },
    {
      element:<DetailBlog />,
      path:'/blog/:name'
    }
])

const Routage = () => {
  return (
    <RouterProvider router={route}></RouterProvider>
  )
}

export default Routage