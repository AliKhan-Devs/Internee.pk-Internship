import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { PortfolioProvider } from './context/portfolioContext.jsx'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <PortfolioProvider>
      
    <App />
     <Toaster position="top-right" richColors closeButton />
    </PortfolioProvider>
    </AuthProvider>
  </StrictMode>,
)
