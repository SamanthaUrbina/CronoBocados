let carrito = [];

let total = 0;

const LIMITE_PEDIDO = 99;

const botonesAgregar =
    document.querySelectorAll(".agregar-carrito");

const listaCarrito =
    document.getElementById("lista-carrito");

const totalHTML =
    document.getElementById("total");

const contador =
    document.getElementById("contador-carrito");


// AGREGAR PRODUCTOS

botonesAgregar.forEach(boton => {

    boton.addEventListener("click", () => {

        if (carrito.length >= LIMITE_PEDIDO) {

            alert(
                "El máximo de productos permitidos por pedido es 99.\n\nPara pedidos más grandes, por favor contacta directamente a la tienda."
            );

            window.location.href = "contacto.html";

            return;
        }

        const nombre =
            boton.dataset.nombre;

        const precio =
            parseFloat(boton.dataset.precio);

        carrito.push({
            nombre,
            precio
        });

        actualizarCarrito();
    });
});


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {

        listaCarrito.innerHTML += `

        <li class="list-group-item d-flex justify-content-between align-items-center">

            <div>

                <strong>${producto.nombre}</strong>

                <br>

                <span>$${producto.precio}</span>

            </div>

            <button
                class="btn btn-sm btn-danger eliminar-producto"
                data-index="${index}">

                X

            </button>

        </li>
        `;
    });

    total = carrito.reduce(
        (acc, producto) =>
            acc + producto.precio,
        0
    );

    totalHTML.textContent = total;

    contador.textContent =
        `(${carrito.length})`;

    agregarEventosEliminar();
}


// ELIMINAR PRODUCTOS

function agregarEventosEliminar() {

    const botonesEliminar =
        document.querySelectorAll(".eliminar-producto");

    botonesEliminar.forEach(boton => {

        boton.addEventListener("click", () => {

            const index =
                boton.dataset.index;

            carrito.splice(index, 1);

            actualizarCarrito();
        });
    });
}


// VACIAR CARRITO

document.getElementById("vaciarCarrito")
    .addEventListener("click", () => {

        if (carrito.length === 0) {

            alert("El carrito ya está vacío.");

            return;
        }

        const confirmar =
            confirm(
                "¿Deseas eliminar todos los productos del carrito?"
            );

        if (confirmar) {

            carrito = [];

            total = 0;

            actualizarCarrito();
        }
    });


// CONFIRMAR PEDIDO

document.getElementById("confirmarPedido")
    .addEventListener("click", () => {

        if (carrito.length === 0) {

            alert("Tu carrito está vacío.");

            return;
        }

        alert("Pedido realizado correctamente.");

        carrito = [];

        total = 0;

        actualizarCarrito();

        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById("carritoModal")
            );

        modal.hide();
    });