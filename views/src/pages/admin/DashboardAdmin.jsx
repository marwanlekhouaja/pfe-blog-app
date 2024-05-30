import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios"

const DashboardAdmin = () => {
  const [users,setUsers]=useState([])

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
                <button className="btn btn-danger">delete</button><button className="btn btn-success ms-2">edit</button>
              </td>
            </tr>
          )):<tr><td colSpan={7}>no users found !</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardAdmin