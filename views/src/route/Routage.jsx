import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Dashboard from '../components/user/Dashboard'
import Create from '../components/post/Create'
import Profile from '../components/user/Profile'
import DashboardAdmin from '../admin/DashboardAdmin'
import Login from '../components/user/Login'
import NotFound from '../components/NotFound'
import Register from '../components/user/Register'
import SearchPost from '../components/post/SearchPost'
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
      path:'/search/?q=:value',
      element:<SearchPost />
    },
    {
      path:'*',
      element:<NotFound />
    }
])

const Routage = () => {
  return (
    <RouterProvider router={route}></RouterProvider>
  )
}

export default Routage