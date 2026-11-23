import { useState } from "react";
import "./App.css";

const productosIniciales = [
  {
    id: 1,
    nombre: "Playera Urban",
    precio: 299,
    stock: 10,
    descripcion:
      "Playera de algodón con corte urbano y diseño minimalista.",
  },
  {
    id: 2,
    nombre: "Sudadera Essential",
    precio: 599,
    stock: 8,
    descripcion:
      "Sudadera cómoda para uso diario con acabado suave.",
  },
  {
    id: 3,
    nombre: "Gorra Street",
    precio: 249,
    stock: 12,
    descripcion:
      "Gorra ajustable con diseño casual.",
  },
];

export default function App() {
  const [vista, setVista] = useState("menu");
  const [productoSeleccionado, setProductoSeleccionado] =
    useState(null);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] =
    useState(productosIniciales);
  const [ultimaVenta, setUltimaVenta] = useState(null);

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setVista("detalle");
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) {
      return;
    }

    setProductos(
      productos.filter(
        (producto) => producto.id !== id
      )
    );

    alert("Producto eliminado correctamente");
  };

  const editarProducto = (producto) => {
    const nuevoNombre = window.prompt(
      "Nuevo nombre del producto:",
      producto.nombre
    );

    if (
      nuevoNombre === null ||
      nuevoNombre.trim() === ""
    ) {
      return;
    }

    const nuevoPrecio = window.prompt(
      "Nuevo precio:",
      producto.precio
    );

    if (
      nuevoPrecio === null ||
      isNaN(nuevoPrecio) ||
      Number(nuevoPrecio) <= 0
    ) {
      alert("El precio no es válido");
      return;
    }

    const nuevoStock = window.prompt(
      "Nuevo stock:",
      producto.stock
    );

    if (
      nuevoStock === null ||
      isNaN(nuevoStock) ||
      Number(nuevoStock) < 0
    ) {
      alert("El stock no es válido");
      return;
    }

    const productosActualizados =
      productos.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              nombre: nuevoNombre.trim(),
              precio: Number(nuevoPrecio),
              stock: Number(nuevoStock),
            }
          : item
      );

    setProductos(productosActualizados);

    alert("Producto actualizado correctamente");
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(
      (item) => item.id === producto.id
    );

    if (existe) {
      if (existe.cantidad >= producto.stock) {
        alert(
          "No hay suficiente stock disponible"
        );
        return;
      }

      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      );
    } else {
      if (producto.stock <= 0) {
        alert("Producto sin stock");
        return;
      }

      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }

    setVista("carrito");
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito(
      carrito
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad =
              item.cantidad + cambio;

            if (nuevaCantidad > item.stock) {
              alert(
                "No puedes superar el stock disponible"
              );
              return item;
            }

            return {
              ...item,
              cantidad: nuevaCantidad,
            };
          }

          return item;
        })
        .filter(
          (item) => item.cantidad > 0
        )
    );
  };

  const total = carrito.reduce(
    (suma, item) =>
      suma +
      item.precio * item.cantidad,
    0
  );

  const confirmarVenta = () => {
    const productosActualizados =
      productos.map((producto) => {
        const itemVendido = carrito.find(
          (item) =>
            item.id === producto.id
        );

        if (itemVendido) {
          return {
            ...producto,
            stock:
              producto.stock -
              itemVendido.cantidad,
          };
        }

        return producto;
      });

    setProductos(productosActualizados);

    const venta = {
      folio: Date.now(),
      fecha:
        new Date().toLocaleString(),
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
          <button
            onClick={() =>
              setVista("menu")
            }
          >
            Menú
          </button>

          <button
            onClick={() =>
              setVista("catalogo")
            }
          >
            Catálogo
          </button>

          <button
            onClick={() =>
              setVista("carrito")
            }
          >
            Carrito ({carrito.length})
          </button>
        </nav>
      </header>

      <main>
        {/* MENÚ PRINCIPAL */}
        {vista === "menu" && (
          <>
            <h2>Menú principal</h2>

            <div className="productos">
              <div className="card">
                <h3>
                  Actividades realizadas
                </h3>

                <p>
                  Consulta los principales
                  avances desarrollados
                  durante el curso.
                </p>

                <button
                  onClick={() =>
                    setVista(
                      "actividades"
                    )
                  }
                >
                  Ver actividades
                </button>
              </div>

              <div className="card">
                <h3>
                  Sistema implementado
                </h3>

                <p>
                  Accede al sistema
                  funcional Stone Fish.
                </p>

                <button
                  onClick={() =>
                    setVista("catalogo")
                  }
                >
                  Abrir sistema
                </button>
              </div>

              <div className="card">
                <h3>Código fuente</h3>

                <p>
                  Consulta el código del
                  proyecto almacenado en
                  GitHub.
                </p>

                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/alejraul94-bit/stonefish-sprint1",
                      "_blank"
                    )
                  }
                >
                  Abrir GitHub
                </button>
              </div>

              <div className="card">
                <h3>
                  Reporte de modificaciones
                </h3>

                <p>
                  Consulta los principales
                  cambios realizados al
                  sistema.
                </p>

                <button
                  onClick={() =>
                    setVista(
                      "modificaciones"
                    )
                  }
                >
                  Ver reporte
                </button>
              </div>
            </div>
          </>
        )}

        {/* ACTIVIDADES */}
        {vista === "actividades" && (
          <section className="detalle">
            <h2>
              Actividades realizadas
            </h2>

            <p>
              <strong>
                Unidad 1:
              </strong>{" "}
              Planeación del proyecto,
              Product Backlog y Sprint
              inicial.
            </p>

            <p>
              <strong>
                Unidad 2:
              </strong>{" "}
              Aplicación de Scrum,
              calendarización y revisión
              de Sprints.
            </p>

            <p>
              <strong>
                Unidad 3:
              </strong>{" "}
              Desarrollo en React,
              carrito, venta y control
              de inventario.
            </p>

            <p>
              <strong>
                Unidad 4:
              </strong>{" "}
              Revisión final,
              generación de ticket,
              edición y eliminación de
              productos.
            </p>

            <button
              className="principal"
              onClick={() =>
                setVista("menu")
              }
            >
              Volver al menú
            </button>
          </section>
        )}

        {/* REPORTE DE MODIFICACIONES */}
        {vista ===
          "modificaciones" && (
          <section className="detalle">
            <h2>
              Reporte de modificaciones
            </h2>

            <p>
              Durante el desarrollo de
              Stone Fish se realizaron
              los siguientes cambios:
            </p>

            <p>
              ✓ Implementación del
              catálogo de productos.
            </p>

            <p>
              ✓ Registro de venta
              mediante carrito.
            </p>

            <p>
              ✓ Validación de stock
              disponible.
            </p>

            <p>
              ✓ Descuento automático de
              inventario.
            </p>

            <p>
              ✓ Generación de ticket de
              venta.
            </p>

            <p>
              ✓ Edición de productos.
            </p>

            <p>
              ✓ Eliminación de
              productos.
            </p>

            <button
              className="principal"
              onClick={() =>
                setVista("menu")
              }
            >
              Volver al menú
            </button>
          </section>
        )}

        {/* CATÁLOGO */}
        {vista === "catalogo" && (
          <>
            <h2>
              Catálogo de productos
            </h2>

            <div className="productos">
              {productos.map(
                (producto) => (
                  <div
                    className="card"
                    key={producto.id}
                  >
                    <div className="imagen-placeholder">
                      Imagen
                    </div>

                    <h3>
                      {producto.nombre}
                    </h3>

                    <p>
                      $
                      {producto.precio}
                    </p>

                    <p>
                      Stock disponible:{" "}
                      {producto.stock}
                    </p>

                    <button
                      onClick={() =>
                        verDetalle(
                          producto
                        )
                      }
                    >
                      Ver detalle
                    </button>

                    <button
                      onClick={() =>
                        editarProducto(
                          producto
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarProducto(
                          producto.id
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* DETALLE */}
        {vista === "detalle" &&
          productoSeleccionado && (
            <section className="detalle">
              <button
                onClick={() =>
                  setVista("catalogo")
                }
              >
                ← Volver
              </button>

              <div className="imagen-placeholder grande">
                Imagen
              </div>

              <h2>
                {
                  productoSeleccionado.nombre
                }
              </h2>

              <p>
                {
                  productoSeleccionado.descripcion
                }
              </p>

              <h3>
                $
                {
                  productoSeleccionado.precio
                }
              </h3>

              <p>
                Stock disponible:{" "}
                {
                  productoSeleccionado.stock
                }
              </p>

              <button
                className="principal"
                onClick={() =>
                  agregarAlCarrito(
                    productoSeleccionado
                  )
                }
              >
                Agregar al carrito
              </button>
            </section>
          )}

        {/* CARRITO */}
        {vista === "carrito" && (
          <>
            <h2>
              Carrito de compras
            </h2>

            {carrito.length === 0 ? (
              <p>
                Tu carrito está vacío.
              </p>
            ) : (
              <div className="carrito">
                {carrito.map(
                  (item) => (
                    <div
                      className="item-carrito"
                      key={item.id}
                    >
                      <div>
                        <strong>
                          {item.nombre}
                        </strong>

                        <p>
                          ${item.precio} c/u
                        </p>

                        <p>
                          Stock disponible:{" "}
                          {item.stock}
                        </p>
                      </div>

                      <div className="cantidad">
                        <button
                          onClick={() =>
                            cambiarCantidad(
                              item.id,
                              -1
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {item.cantidad}
                        </span>

                        <button
                          onClick={() =>
                            cambiarCantidad(
                              item.id,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <strong>
                        $
                        {item.precio *
                          item.cantidad}
                      </strong>
                    </div>
                  )
                )}

                <h3>
                  Total: ${total}
                </h3>

                <button
                  className="principal"
                  onClick={
                    confirmarVenta
                  }
                >
                  Confirmar venta
                </button>
              </div>
            )}
          </>
        )}

        {/* TICKET */}
        {vista === "ticket" &&
          ultimaVenta && (
            <section className="detalle">
              <h2>
                Ticket de venta
              </h2>

              <p>
                <strong>
                  Folio:
                </strong>{" "}
                {ultimaVenta.folio}
              </p>

              <p>
                <strong>
                  Fecha:
                </strong>{" "}
                {ultimaVenta.fecha}
              </p>

              <hr />

              {ultimaVenta.productos.map(
                (item) => (
                  <div
                    key={item.id}
                    className="item-carrito"
                  >
                    <div>
                      <strong>
                        {item.nombre}
                      </strong>

                      <p>
                        {item.cantidad} x $
                        {item.precio}
                      </p>
                    </div>

                    <strong>
                      $
                      {item.precio *
                        item.cantidad}
                    </strong>
                  </div>
                )
              )}

              <hr />

              <h3>
                Total: $
                {ultimaVenta.total}
              </h3>

              <button
                className="principal"
                onClick={() =>
                  setVista("catalogo")
                }
              >
                Volver al catálogo
              </button>
            </section>
          )}
      </main>
    </div>
  );
}