import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Routes/Routex.jsx'
import { RouterProvider } from "react-router/dom";

import AuthProvider from './Context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
    <AuthProvider>

      <RouterProvider router={router} />
    </AuthProvider>
   
  </StrictMode>,
)
