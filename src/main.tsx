import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'

// Force Vite cache invalidation after deleting compiled .js files
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
