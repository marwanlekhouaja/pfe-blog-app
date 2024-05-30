import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Create from '../components/post/Create'
import Profile from '../components/user/Profile'
import DashboardAdmin from '../pages/admin/DashboardAdmin'
import Login from '../components/user/Login'
import NotFound from '../components/NotFound'
import Register from '../components/user/Register'
import SearchPost from '../components/post/SearchPost'
import Dashboard from '../pages/user/Dashboard'
import FilterBlogsByCategory from '../components/category/FilterBlogsByCategory'
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
    }
])

const Routage = () => {
  return (
    <RouterProvider router={route}></RouterProvider>
  )
}

export default Routage