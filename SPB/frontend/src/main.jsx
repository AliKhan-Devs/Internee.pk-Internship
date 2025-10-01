import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { PortfolioProvider } from './context/portfolioContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <PortfolioProvider>
    <App />
    </PortfolioProvider>
    </AuthProvider>
  </StrictMode>,
)
