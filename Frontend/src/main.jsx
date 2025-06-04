// Modern Vite version of the main entry point
import { StrictMode } from 'react' // More specific import
import { createRoot } from 'react-dom/client' // Modern API
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
