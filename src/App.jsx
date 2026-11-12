import { useState } from "react";
import "./App.css";

const productosIniciales = [
  {
    id: 1,
    nombre: "Playera Urban",
    precio: 299,
    stock: 10,
    descripcion: "Playera de algodón con corte urbano y diseño minimalista.",
  },
  {
    id: 2,
    nombre: "Sudadera Essential",
    precio: 599,
    stock: 8,
    descripcion: "Sudadera cómoda para uso diario con acabado suave.",
  },
  {
    id: 3,
    nombre: "Gorra Street",
    precio: 249,
    stock: 12,
    descripcion: "Gorra ajustable con diseño casual.",
  },
];

export default function App() {
  const [vista, setVista] = useState("catalogo");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState(productosIniciales);
  const [ultimaVenta, setUltimaVenta] = useState(null);

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setVista("detalle");
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      if (existe.cantidad >= producto.stock) {
        alert("No hay suficiente stock disponible");
        return;
      }

      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      if (producto.stock <= 0) {
        alert("Producto sin stock");
        return;
      }

      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    setVista("carrito");
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito(
      carrito
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + cambio;

            if (nuevaCantidad > item.stock) {
              alert("No puedes superar el stock disponible");
              return item;
            }

            return {
              ...item,
              cantidad: nuevaCantidad,
            };
          }

          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  const confirmarVenta = () => {
    const productosActualizados = productos.map((producto) => {
      const itemVendido = carrito.find(
        (item) => item.id === producto.id
      );

      if (itemVendido) {
        return {
          ...producto,
          stock: producto.stock - itemVendido.cantidad,
        };
      }

      return producto;
    });

    setProductos(productosActualizados);

    const venta = {
      folio: Date.now(),
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total: total,
    };

    setUltimaVenta(venta);

    alert("Venta realizada correctamente");

    setCarrito([]);
    setVista("ticket");
  };

  return (
    <div className="app">
      <header>
        <h1>Stone Fish</h1>

        <nav>
          <button onClick={() => setVista("catalogo")}>
            Catálogo
          </button>

          <button onClick={() => setVista("carrito")}>
            Carrito ({carrito.length})
          </button>
        </nav>
      </header>

      <main>
        {/* CATÁLOGO */}
        {vista === "catalogo" && (
          <>
            <h2>Catálogo de productos</h2>

            <div className="productos">
              {productos.map((producto) => (
                <div className="card" key={producto.id}>
                  <div className="imagen-placeholder">
                    Imagen
                  </div>

                  <h3>{producto.nombre}</h3>

                  <p>${producto.precio}</p>

                  <p>
                    Stock disponible: {producto.stock}
                  </p>

                  <button
                    onClick={() => verDetalle(producto)}
                  >
                    Ver detalle
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DETALLE DEL PRODUCTO */}
        {vista === "detalle" && productoSeleccionado && (
          <section className="detalle">
            <button
              onClick={() => setVista("catalogo")}
            >
              ← Volver
            </button>

            <div className="imagen-placeholder grande">
              Imagen
            </div>

            <h2>{productoSeleccionado.nombre}</h2>

            <p>
              {productoSeleccionado.descripcion}
            </p>

            <h3>
              ${productoSeleccionado.precio}
            </h3>

            <p>
              Stock disponible:{" "}
              {productoSeleccionado.stock}
            </p>

            <button
              className="principal"
              onClick={() =>
                agregarAlCarrito(productoSeleccionado)
              }
            >
              Agregar al carrito
            </button>
          </section>
        )}

        {/* CARRITO */}
        {vista === "carrito" && (
          <>
            <h2>Carrito de compras</h2>

            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <div className="carrito">
                {carrito.map((item) => (
                  <div
                    className="item-carrito"
                    key={item.id}
                  >
                    <div>
                      <strong>{item.nombre}</strong>

                      <p>
                        ${item.precio} c/u
                      </p>

                      <p>
                        Stock disponible: {item.stock}
                      </p>
                    </div>

                    <div className="cantidad">
                      <button
                        onClick={() =>
                          cambiarCantidad(item.id, -1)
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() =>
                          cambiarCantidad(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <strong>
                      ${item.precio * item.cantidad}
                    </strong>
                  </div>
                ))}

                <h3>
                  Total: ${total}
                </h3>

                <button
                  className="principal"
                  onClick={confirmarVenta}
                >
                  Confirmar venta
                </button>
              </div>
            )}
          </>
        )}

        {/* TICKET DE VENTA */}
        {vista === "ticket" && ultimaVenta && (
          <section className="detalle">
            <h2>Ticket de venta</h2>

            <p>
              <strong>Folio:</strong>{" "}
              {ultimaVenta.folio}
            </p>

            <p>
              <strong>Fecha:</strong>{" "}
              {ultimaVenta.fecha}
            </p>

            <hr />

            {ultimaVenta.productos.map((item) => (
              <div
                key={item.id}
                className="item-carrito"
              >
                <div>
                  <strong>{item.nombre}</strong>

                  <p>
                    {item.cantidad} x ${item.precio}
                  </p>
                </div>

                <strong>
                  ${item.precio * item.cantidad}
                </strong>
              </div>
            ))}

            <hr />

            <h3>
              Total: ${ultimaVenta.total}
            </h3>

            <button
              className="principal"
              onClick={() => setVista("catalogo")}
            >
              Volver al catálogo
            </button>
          </section>
        )}
      </main>
    </div>
  );
}