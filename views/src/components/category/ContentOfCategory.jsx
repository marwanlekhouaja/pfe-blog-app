import LayoutDashboardUser from "../user/LayoutDashboardUser"

// eslint-disable-next-line react/prop-types
const ContentOfCategory = ({blogs}) => {
  return (
    <div>
        <LayoutDashboardUser />
         {/* eslint-disable-next-line react/prop-types */}
        {blogs.length!==0?blogs.map((blog) => (
                    <div key={blog.id} className="rounded card shadow m-2 p-2">
                        <p className="text-secondary d-flex align-items-center">
                            <img
                                src="/aucun_photo.png"
                                className="me-2 rounded-pill"
                                width={50}
                                height={50}
                                alt=""
                            />
                            <span>
                                created by {blog.user.name} at <span> </span>
                                {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                        </p>
                        {blog.image ? (
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="w-75 p-2">
                                    <h4>{blog.title}</h4>
                                    <p>
                                        {blog.body.length > 200
                                            ? blog.body.slice(0, 200) + "..."
                                            : blog.body}
                                    </p>
                                </div>
                                <div>
                                    <img
                                        style={{
                                            height: "200px",
                                            width: "200px",
                                        }}
                                        loading="lazy"
                                        src={`http://localhost:8000/storage/${blog.image}`}
                                        className="rounded"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h4>{blog.title}</h4>
                                <p>
                                    {blog.body.length > 200
                                        ? blog.body.slice(0, 200) + "..."
                                        : blog.body}
                                </p>
                            </div>
                        )}
                    </div>
                )):
                <div className="text-center mt-4">blogs not found in this topic !</div>}
    </div>
  )
}

export default ContentOfCategory