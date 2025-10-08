import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-brand">TP4 - Lenguaje IV</div>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      </div>
    </nav>
  )
}
