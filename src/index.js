import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="908201826381-4b4l515b0air3r33vt7ug5a8tg5i288p.apps.googleusercontent.com">
           <App />
           </GoogleOAuthProvider>;
    </BrowserRouter>
  </React.StrictMode>
)
