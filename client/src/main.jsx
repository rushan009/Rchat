

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from './components/ui/sonner'
import { SocketProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <SocketProvider>
      <App />
      <Toaster />
    </SocketProvider>
    </AuthProvider>
  </StrictMode>,
)