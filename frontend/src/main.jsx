import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ClerkProvider from './provider/CheckProvide.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider>
    <App />
    </ClerkProvider>


  </React.StrictMode>,
)

