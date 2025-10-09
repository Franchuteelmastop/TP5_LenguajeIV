import React, { useEffect, useState } from 'react'

export default function ApiPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Fallback (foto genérica si la raza no tiene imagen)
  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80'

  useEffect(() => {
    // Traemos 4 razas (The Dog API, sin necesidad de API key para este endpoint)
    fetch('https://api.thedogapi.com/v1/breeds?limit=4')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status)
        return res.json()
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching Dog API:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="container">
        <h1>Datos desde API - Razas de Perros</h1>
        <p>Cargando información...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container">
        <h1>Datos desde API - Razas de Perros</h1>
        <p>Error al obtener los datos. Intentá redeployear o comprobá la consola.</p>
      </main>
    )
  }

  return (
    <main className="container">
      <h1>Datos desde API - Razas de Perros</h1>
      <div className="cards">
        {items.map(dog => (
          <div className="card" key={dog.id}>
            <img
              src={dog.image?.url || FALLBACK_IMG}
              alt={dog.name || 'Perro'}
              onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
            />
            <div className="card-body">
              <h3>{dog.name || 'Sin nombre'}</h3>
              <p><strong>Altura:</strong> {dog.height?.metric || 'N/D'} cm</p>
              <p><strong>Peso:</strong> {dog.weight?.metric || 'N/D'} kg</p>
              <p><strong>Esperanza de vida:</strong> {dog.life_span || 'N/D'}</p>
              <p><strong>Temperamento:</strong> {dog.temperament || 'Sin datos'}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
