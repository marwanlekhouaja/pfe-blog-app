import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Context from './context/AppContext'
// import Routage from './route/Routage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context />
  </React.StrictMode>,
)
