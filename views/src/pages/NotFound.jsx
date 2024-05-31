import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div style={{height:'90dvh'}} className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className="text-primary">404</h1>
        <h2>Oops...page not found</h2>
        <img src="/notfound.png" alt="notfound" width={400} height={400} />
        <Link to='/' className='btn btn-primary mt-2'>go to Home page</Link>
    </div>
  )
}

export default NotFound