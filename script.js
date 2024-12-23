// Variables para el carrito y total
let carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");


// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    e.preventDefault();  // Esto evitará que el enlace redirija a la página Producto.html
    const boton = e.target;
    const idProducto = boton.getAttribute("data-id");
    const nombreProducto = boton.closest('.producto__informacion').querySelector('.producto__nombre').textContent;
    const precioProducto = parseFloat(boton.closest('.producto__informacion').querySelector('.producto__precio').textContent.replace('$', '').trim());

    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.id === idProducto);
    if (productoExistente) {
        // Si ya existe, incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo agregamos con cantidad 1
        carrito.push({
            id: idProducto,
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: 1
        });
    }

    actualizarCarrito();
}


// Función para actualizar la lista del carrito
function actualizarCarrito() {
    // Limpiamos la lista de productos del carrito
    listaCarrito.innerHTML = '';

    // Iteramos sobre los productos en el carrito
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        listaCarrito.appendChild(li);
    });

    // Actualizamos el total
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Event listener para vaciar el carrito
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

// Agregar evento a todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll(".producto__boton");
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
});

// Función para finalizar la compra
function finalizarCompra() {
    const modalCarritoVacio = document.getElementById("modal-carrito-vacio");
    
    if (carrito.length === 0) {
        // Mostrar el modal de carrito vacío
        modalCarritoVacio.style.display = "block";
    } else {
        // Mostrar la ventana emergente de compra exitosa
        const modal = document.getElementById("modal-compra-exitosa");
        modal.style.display = "block";

        // Opcionalmente, vaciar el carrito después de la compra
        vaciarCarrito();
    }
}

// Evento para cerrar el modal al hacer clic en el botón "Cerrar" o fuera del modal
const cerrarModalBtn = document.getElementById("cerrar-modal-btn");
const cerrarModalIcono = document.getElementById("cerrar-modal");
const modal = document.getElementById("modal-compra-exitosa");

// Cerrar el modal al hacer clic en el botón "Cerrar"
cerrarModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Cerrar el modal al hacer clic en la "×"
cerrarModalIcono.addEventListener("click", function() {
    modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Evento para el botón Finalizar compra
const finalizarCompraBtn = document.getElementById("finalizar-compra");
finalizarCompraBtn.addEventListener("click", finalizarCompra);

// Evento para cerrar el modal de carrito vacío
const cerrarModalCarritoVacio = document.getElementById("cerrar-modal-carrito-vacio");
const modalCarritoVacio = document.getElementById("modal-carrito-vacio");

// Cerrar el modal de carrito vacío al hacer clic en la "×"
cerrarModalCarritoVacio.addEventListener("click", function() {
    modalCarritoVacio.style.display = "none";
});

// Cerrar el modal de carrito vacío al hacer clic fuera del contenido
window.addEventListener("click", function(event) {
    if (event.target === modalCarritoVacio) {
        modalCarritoVacio.style.display = "none";
    }
});





