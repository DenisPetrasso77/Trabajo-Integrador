// Variables para el carrito y total
let carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const modalCompraExitosa = document.getElementById("modal-compra-exitosa");
const modalCarritoVacio = document.getElementById("modal-carrito-vacio");

// Funciones para modales
function mostrarModal(modal) {
    modal.style.display = "block";
}

function ocultarModal(modal) {
    modal.style.display = "none";
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    e.preventDefault();
    const boton = e.target;
    const idProducto = boton.dataset.id; // Assuming the data-id attribute is still used

    // Find product information based on id (modify this part if needed)
    let producto = null;
    for (const item of document.querySelectorAll('.card')) {
        if (item.querySelector('.producto__boton').dataset.id === idProducto) {
            producto = {
                nombre: item.querySelector('.card__nombre').textContent,
                precio: parseFloat(item.querySelector('.card__precio').textContent.replace('$', '').trim()),
                cantidad: 1
            };
            break;
        }
    }

    if (!producto) {
        console.error("Producto no encontrado con id:", idProducto);
        return;  // Exit if product not found (optional)
    }

    const productoExistente = carrito.find(producto => producto.id === idProducto);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push(producto);
    }

    actualizarCarrito();
}

// Funciones para carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarModal(modalCarritoVacio);
    } else {
        mostrarModal(modalCompraExitosa);
        vaciarCarrito();
    }
}

// Solo agregar los event listeners si el carrito está presente en la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificamos si existe el elemento con id "vaciar-carrito" antes de ejecutar la lógica del carrito
    if (vaciarCarritoBtn) {
        const botonesAgregar = document.querySelectorAll(".producto__boton"); // Assuming class name is still "producto__boton"
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });

        const cerrarModalBtns = document.querySelectorAll('.cerrar, .btn-cerrar');
        cerrarModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                ocultarModal(modal);
            });
        });

        window.addEventListener("click", (event) => {
            if (event.target.classList.contains('modal')) {
                ocultarModal(event.target);
            }
        });

        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
        finalizarCompraBtn.addEventListener("click", finalizarCompra);
    }
});

/*----------------------------*/


// Verificar si estamos en la página de contacto
if (document.getElementById('formularioContacto')) {
    // Obtener el formulario y los campos
    const formulario = document.getElementById('formularioContacto');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    // Función para verificar si todos los campos están completos
    function verificarCamposFormulario() {
        // Verificar si algún campo está vacío
        if (nombre.value.trim() === '' || email.value.trim() === '' || mensaje.value.trim() === '') {
            // Mostrar un mensaje o realizar una acción si algún campo está vacío
            alert('Por favor, completa todos los campos.');
            return false;  // Retornar false para evitar el envío del formulario
        }
        return true;  // Si todos los campos están completos, retornar true
    }

    // Agregar un event listener para el envío del formulario
    formulario.addEventListener('submit', function(event) {
        // Si los campos no están completos, evitar el envío del formulario
        if (!verificarCamposFormulario()) {
            event.preventDefault();
        }
    });
}
 /*-----------------------------------------*/






