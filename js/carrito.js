document.addEventListener("DOMContentLoaded", () => {

    let carrito = [];

    const carritoLista = document.getElementById("carritoLista");
    const carritoTotal = document.getElementById("carritoTotal");

    // AGREGAR PRODUCTO
    function agregarAlCarrito(producto) {

        const existente = carrito.find(p => p.id === producto.id);

        if (existente) {

            if (existente.cantidad >= 99) {

                alert("La cantidad máxima por producto es 99.");

                return;
            }

            existente.cantidad++;

        } else {

            carrito.push({
                ...producto,
                cantidad: 1
            });

        }

        renderCarrito();

    }

    // ELIMINAR PRODUCTO
    function eliminarProducto(id) {

        carrito = carrito.filter(p => p.id !== id);

        renderCarrito();

    }

    // VACIAR CARRITO
    function vaciarCarrito() {

        carrito = [];

        renderCarrito();

    }

    // RENDER
    function renderCarrito() {

        carritoLista.innerHTML = "";

        let total = 0;

        if (carrito.length === 0) {

            carritoLista.innerHTML = `
                <p class="text-muted">
                    No hay productos seleccionados.
                </p>
            `;

        }

        carrito.forEach(producto => {

            total += producto.precio * producto.cantidad;

            const item = document.createElement("div");

            item.classList.add("menu-card", "p-3", "mb-3");

            item.innerHTML = `

                <div class="d-flex justify-content-between align-items-center">

                    <div>

                        <h5>${producto.nombre}</h5>

                        <p class="mb-1">
                            Cantidad: ${producto.cantidad}
                        </p>

                        <p class="mb-0">
                            Subtotal: $${producto.precio * producto.cantidad}
                        </p>

                    </div>

                    <button 
                        class="btn btn-danger btn-sm btn-eliminar"
                        data-id="${producto.id}">
                        
                        Eliminar

                    </button>

                </div>

            `;

            carritoLista.appendChild(item);

        });

        carritoTotal.textContent = total;

    }

    document.addEventListener("click", (e) => {

        // agregar al carrito
        if (e.target.classList.contains("btn-agregar")) {

            const id = parseInt(e.target.dataset.id);

            const producto = productos.find(p => p.id === id);

            if (!producto) return;

            agregarAlCarrito(producto);

        }

        // eliminar producto
        if (e.target.classList.contains("btn-eliminar")) {

            const id = parseInt(e.target.dataset.id);

            eliminarProducto(id);

        }

    });

    // botón vaciar carrito
    const btnVaciar = document.getElementById("btnVaciarCarrito");

    if (btnVaciar) {

        btnVaciar.addEventListener("click", vaciarCarrito);

    }

    renderCarrito();

});