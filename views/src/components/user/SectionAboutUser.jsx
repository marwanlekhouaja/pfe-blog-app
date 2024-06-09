// eslint-disable-next-line react/prop-types
function SectionAboutUser({about}) {
  return (
    <div className="d-flex justify-content-center">
        <p className="col-10 col-md-8 text-center mt-4" style={{fontFamily:'monospace'}}>
            {about?about:'no bio...'}
        </p>
    </div>
  )
}

export default SectionAboutUser