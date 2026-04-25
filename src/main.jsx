import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CaffeineAligarh from './pages/CaffeineAligarh'
import CaffeineAdmin from './pages/CaffeineAdmin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CaffeineAligarh />} />
        <Route path="/admin" element={<CaffeineAdmin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
