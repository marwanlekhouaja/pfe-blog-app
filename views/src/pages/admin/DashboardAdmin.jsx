import { useContext, useEffect, useState } from "react"
import { axiosClient } from "../../api/axios"
import { AppContext } from "../../context/AppContext"

const DashboardAdmin = () => {
  const [users,setUsers]=useState([])
  const {ListBlogs}=useContext(AppContext)
  const {listCategories}=useContext(AppContext)

  useEffect(()=>{
    axiosClient.get('/api/users')
    .then(data=>setUsers(data.data))
    .catch(error=>console.log(error))

  },[])
  return (
    <div>
      <table className="table table-light shadow-sm mt-3 container text-center">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>image</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length!==0?users.map((user)=>(
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.image?user.image:'null'}</td>
              <td>
                <button className="btn btn-danger"><i className="bi bi-trash3-fill"></i></button><button className="btn btn-success ms-2"><i className="bi bi-pencil-square"></i></button>
              </td>
            </tr>
          )):<tr><td colSpan={7}>no users found !</td></tr>}
        </tbody>
      </table>
      <table className="table table-light shadow-sm mt-3 container text-center">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>image</th>
            <th>category</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {ListBlogs.length!==0?ListBlogs.map((blog)=>(
            <tr key={blog.id}>
              <td>{blog.title.length>20?blog.title.slice(0,20)+'...':blog.title}</td>
              <td>{blog.body.length>50?blog.body.slice(0,50)+'...':blog.body}</td>
              <td>{blog.image?<img width={60} src={`http://localhost:8000/storage/${blog.image}`} />:'null'}</td>
              <td>{blog.category.type}</td>
              <td>
                <button className="btn btn-danger"><i className="bi bi-trash3-fill"></i></button><button className="btn btn-success ms-2"><i className="bi bi-pencil-square"></i></button>
              </td>
            </tr>
          )):<tr><td colSpan={7}>no blogs found !</td></tr>}
        </tbody>
      </table>
      <table className="table table-light shadow-sm mt-3 container text-center">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>type</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {listCategories.length!==0?listCategories.map((category)=>(
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.type}</td>
              <td>
                <button className="btn btn-danger"><i className="bi bi-trash3-fill"></i></button><button className="btn btn-success ms-2"><i className="bi bi-pencil-square"></i></button>
              </td>
            </tr>
          )):<tr><td colSpan={7}>no categories found !</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardAdmin