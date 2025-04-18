// Seleccionamos todos los botones de "Agregar al carrito"
const botonesCompra = document.querySelectorAll(".btn-produc");

// Arreglo que contendrá los productos añadidos al carrito
const carrito = [];

// Elemento contenedor donde se mostrarán los productos agregados al carrito
const contenedorCarrito = document.getElementById("productoCarrito");

// Elemento donde se mostrará el total del precio
const totalElemento = document.getElementById("toatlPrecio");

// Botones de comprar y vaciar carrito
const botonComprar = document.getElementById("btnFinish");
const botonVaciar = document.getElementById("vaciarCarrito");

/**
 * Función que asocia un evento click a cada botón de producto.
 * Cuando se da clic, se extrae la información del producto y se agrega al carrito.
 */
function agregarAlCarrito() {
  botonesCompra.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      // Localiza el contenedor del producto (clase .informacion)
      const producto = e.target.closest(".informacion");

      // Obtiene nombre del producto
      const nombre = producto.querySelector(
        ".descripcion-producto"
      ).textContent;

      // Obtiene el precio y lo convierte en número (quitando el $)
      const precioTexto = producto.querySelector(".precio").textContent;
      const precio = parseInt(precioTexto.replace("$", "").trim());

      // Obtiene la opción seleccionada en el menú de salsas
      const salsa = producto.querySelector(".select-menu").value;

      // Crea un objeto producto con un ID único
      const productoCarrito = {
        id: Date.now(), // ID único basado en timestamp
        nombre,
        precio,
        salsa,
      };

      // Agrega el producto al arreglo del carrito
      carrito.push(productoCarrito);

      // Actualiza la vista del carrito en el HTML
      renderizarCarrito();

      // Muestra alerta usando SweetAlert
      swal("Producto agregado", `${nombre} - $${precio}`, "success");
    });
  });
}

/**
 * Función que renderiza el carrito de compras en el HTML.
 * Muestra cada producto con nombre, salsa, precio y botón de eliminar.
 */
function renderizarCarrito() {
  // Limpia el contenido anterior del carrito
  contenedorCarrito.innerHTML = "";

  // Recorre el carrito y crea elementos para cada producto
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    // Inserta HTML con info del producto y botón eliminar
    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br/>
        Salsa: ${item.salsa} - $${item.precio}
      </div>
      <button class="btn btn-sm btn-outline-danger eliminar-item" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    `;

    // Agrega el producto visual al contenedor del carrito
    contenedorCarrito.appendChild(li);
  });

  // Actualiza el precio total
  actualizarTotal();

  // Añade eventos de eliminación a cada botón de producto
  agregarEventosEliminar();
}

/**
 * Calcula y actualiza el total de precios de todos los productos en el carrito.
 */
function actualizarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  totalElemento.textContent = total;
}

/**
 * Añade eventos a los botones "Eliminar" de cada producto para poder quitarlos del carrito.
 */
function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll(".eliminar-item");

  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));

      // Busca el índice del producto por su ID
      const index = carrito.findIndex((item) => item.id === id);

      // Si lo encuentra, lo elimina del arreglo y actualiza la vista
      if (index !== -1) {
        carrito.splice(index, 1);
        renderizarCarrito();
      }
    });
  });
}

/**
 * Evento de compra: muestra resumen de productos comprados y vacía el carrito.
 */
botonComprar.addEventListener("click", () => {
  if (carrito.length === 0) {
    swal("Carrito vacío", "Agrega productos antes de comprar.", "info");
    return;
  }

  // Crea un resumen en forma de lista
  let resumen = carrito
    .map(
      (item, i) => `${i + 1}. ${item.nombre} - ${item.salsa} - $${item.precio}`
    )
    .join("\n");

  // Muestra mensaje de éxito con resumen
  swal("Compra realizada", `Resumen:\n${resumen}`, "success");

  // Vacía el carrito
  carrito.length = 0;
  renderizarCarrito();
});

/**
 * Evento de vaciar carrito: limpia todos los productos tras confirmación.
 */
botonVaciar.addEventListener("click", () => {
  if (carrito.length === 0) {
    swal("Carrito ya está vacío", "", "info");
    return;
  }

  // Confirmación con SweetAlert
  swal({
    title: "¿Estás seguro?",
    text: "Esto eliminará todos los productos del carrito.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      carrito.length = 0;
      renderizarCarrito();
      swal("Carrito vaciado correctamente", {
        icon: "success",
      });
    }
  });
});

// Inicializa los eventos al cargar la página
agregarAlCarrito();
