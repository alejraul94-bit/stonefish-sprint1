import { useState } from "react";
import "./App.css";

const productosIniciales = [
  {
    id: 1,
    nombre: "Playera Urban",
    precio: 299,
    descripcion: "Playera de algodón con corte urbano y diseño minimalista.",
  },
  {
    id: 2,
    nombre: "Sudadera Essential",
    precio: 599,
    descripcion: "Sudadera cómoda para uso diario con acabado suave.",
  },
  {
    id: 3,
    nombre: "Gorra Street",
    precio: 249,
    descripcion: "Gorra ajustable con diseño casual.",
  },
];

export default function App() {
  const [vista, setVista] = useState("catalogo");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setVista("detalle");
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    setVista("carrito");
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad + cambio }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  return (
    <div className="app">
      <header>
        <h1>Stone Fish</h1>

        <nav>
          <button onClick={() => setVista("catalogo")}>Catálogo</button>
          <button onClick={() => setVista("carrito")}>
            Carrito ({carrito.length})
          </button>
        </nav>
      </header>

      <main>
        {vista === "catalogo" && (
          <>
            <h2>Catálogo de productos</h2>

            <div className="productos">
              {productosIniciales.map((producto) => (
                <div className="card" key={producto.id}>
                  <div className="imagen-placeholder">
                    Imagen
                  </div>

                  <h3>{producto.nombre}</h3>
                  <p>${producto.precio}</p>

                  <button onClick={() => verDetalle(producto)}>
                    Ver detalle
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {vista === "detalle" && productoSeleccionado && (
          <section className="detalle">
            <button onClick={() => setVista("catalogo")}>
              ← Volver
            </button>

            <div className="imagen-placeholder grande">
              Imagen
            </div>

            <h2>{productoSeleccionado.nombre}</h2>
            <p>{productoSeleccionado.descripcion}</p>
            <h3>${productoSeleccionado.precio}</h3>

            <button
              className="principal"
              onClick={() => agregarAlCarrito(productoSeleccionado)}
            >
              Agregar al carrito
            </button>
          </section>
        )}

        {vista === "carrito" && (
          <>
            <h2>Carrito de compras</h2>

            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <div className="carrito">
                {carrito.map((item) => (
                  <div className="item-carrito" key={item.id}>
                    <div>
                      <strong>{item.nombre}</strong>
                      <p>${item.precio} c/u</p>
                    </div>

                    <div className="cantidad">
                      <button
                        onClick={() => cambiarCantidad(item.id, -1)}
                      >
                        -
                      </button>

                      <span>{item.cantidad}</span>

                      <button
                        onClick={() => cambiarCantidad(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <strong>
                      ${item.precio * item.cantidad}
                    </strong>
                  </div>
                ))}

                <h3>Total: ${total}</h3>
                <button
                  className="principal"
                  onClick={() => {
                    alert("Venta realizada correctamente");
                    setCarrito([]);
                    setVista("catalogo");
                  }}
                >
  Confirmar venta
</button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}