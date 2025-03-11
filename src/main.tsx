import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx'
import { CategoryProvider } from './context/CategoryContext.tsx'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <CategoryProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </CategoryProvider>
    </QueryClientProvider>
  </StrictMode>,
)
