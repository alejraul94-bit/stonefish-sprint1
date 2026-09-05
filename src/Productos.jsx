import { useState } from "react";

export default function Productos({ onLogout }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  const agregar = (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) return setError("El nombre es obligatorio");

    const p = Number(precio);
    if (!precio || Number.isNaN(p) || p <= 0) {
      return setError("El precio debe ser mayor a 0");
    }

    setProductos([...productos, { nombre: nombre.trim(), precio: p }]);
    setNombre("");
    setPrecio("");
  };

  return (
    <div>
      <h2>Productos</h2>
      <button onClick={onLogout}>Cerrar sesión</button>

      <form onSubmit={agregar} style={{ marginTop: 15 }}>
        <div>
          <label>Nombre:</label><br />
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Precio:</label><br />
          <input value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={{ marginTop: 10 }} type="submit">
          Agregar
        </button>
      </form>

      <h3 style={{ marginTop: 20 }}>Listado</h3>
      {productos.length === 0 ? (
        <p>No hay productos aún.</p>
      ) : (
        <ul>
          {productos.map((prod, idx) => (
            <li key={idx}>
              {prod.nombre} — ${prod.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}