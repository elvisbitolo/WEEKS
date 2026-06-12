import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './app/store'
import { HomePage } from './pages/HomePage'
import './index.css'

// Simple default fallback component for the login route template
const LoginPlaceholder = () => (
  <div className="flex items-center justify-center min-h-screen bg-base-300 text-base-content">
    <div className="p-8 bg-base-100 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Authentication Gateway</h2>
      <p className="opacity-70">Login page implementation placeholder.</p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPlaceholder />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)