
// src/pages/ApiPage.jsx
import React, { useEffect, useState } from "react";

export default function ApiPage() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomId = () => Math.floor(Math.random() * 1010) + 1;

  const fetchPokemon = async (id = null) => {
    setLoading(true);
    setError(null);
    try {
      const pokeId = id ?? getRandomId();
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
      if (!res.ok) throw new Error("No se pudo obtener el Pokémon");
      const data = await res.json();
      const obj = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map(t => t.type.name).join(", "),
        image: data.sprites?.other?.["official-artwork"]?.front_default
               || data.sprites?.front_default
               || null
      };
      setPokemon(obj);
    } catch (err) {
      setError(err.message || "Error desconocido");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1>API — PokéInfo</h1>
      <p>Esta página muestra datos desde una API pública (PokeAPI).</p>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => fetchPokemon()} disabled={loading}>
          {loading ? "Cargando..." : "Traer Pokémon aleatorio"}
        </button>
        {" "}
        <button onClick={() => fetchPokemon(25)} disabled={loading}>
          {loading ? "Cargando..." : "Traer Pikachu (id 25)"}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: 12, color: "crimson" }}>
          Error: {error}
        </div>
      )}

      {pokemon && (
        <section style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          marginTop: 20,
          border: "1px solid #ddd",
          padding: 16,
          borderRadius: 8,
          maxWidth: 800
        }}>
          <div style={{ flex: "0 0 200px" }}>
            {pokemon.image ? (
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
            ) : (
              <div style={{
                width: 200,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f5f5",
                borderRadius: 8
              }}>
                Sin imagen
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ textTransform: "capitalize" }}>
              #{pokemon.id} — {pokemon.name}
            </h2>

            <ul style={{ lineHeight: 1.6 }}>
              <li><strong>Altura:</strong> {pokemon.height} (decímetros)</li>
              <li><strong>Peso:</strong> {pokemon.weight} (hectogramos)</li>
              <li><strong>Tipos:</strong> {pokemon.types}</li>
              <li><strong>Fuente:</strong> PokeAPI (https://pokeapi.co/)</li>
            </ul>

            <div style={{ marginTop: 12 }}>
              <small>
                Nota: la imagen usada es el artwork oficial si está disponible.
              </small>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
