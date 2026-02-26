import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#211E1A',
              color: '#F2EDE4',
              fontFamily: '"Noto Sans JP", sans-serif',
              fontSize: '13px',
              borderRadius: '2px',
              border: '1px solid #2E2A24',
            },
            success: { iconTheme: { primary: '#C0392B', secondary: '#F2EDE4' } },
            error:   { iconTheme: { primary: '#B8860B', secondary: '#F2EDE4' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
