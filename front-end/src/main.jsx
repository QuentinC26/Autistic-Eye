import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'  // adapte ce chemin si besoin

// Renders the entire React app inside the <div id="root"> in the HTML page
createRoot(document.getElementById('root')).render(
  // Enables additional checks during development
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
