import React from 'react'
import rooms from '../data/rooms'

export default function Services() {
  return (
    <main className="container">
      <h1>Servicios - Habitaciones</h1>
      <div className="cards">
        {rooms.map((r) => (
          <div className="card" key={r.id}>
            <img src={r.image} alt={r.name} />
            <div className="card-body">
              <h3>{r.name}</h3>
              <p>{r.description}</p>
              <p><strong>Precio:</strong> {r.price}</p>
              <p><strong>Capacidad:</strong> {r.capacity} personas</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
