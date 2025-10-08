import ApiPage from './pages/ApiPage';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ImageUploader from './components/ImageUploader'
import Contact from './components/Contact'
import Services from './components/Services'

function Home() {
  return (
    <main className="container">
      <h1>Visualizador de Imágenes</h1>
      <ImageUploader />
    </main>
  )
}

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/api" element={<ApiPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
