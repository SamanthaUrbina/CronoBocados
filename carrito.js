document.addEventListener("DOMContentLoaded", () => {
    let carrito = [];
    const carritoLista = document.getElementById("carritoLista");
    const carritoTotal = document.getElementById("carritoTotal");
    const btnVaciar = document.getElementById("btnVaciarCarrito");
    const btnConfirmar = document.getElementById("btnConfirmarPedido"); // RECIÉN AGREGADO AL HTML

    function agregarAlCarrito(producto) {
        const existente = carrito.find(p => p.id === producto.id);
        if (existente) {
            if (existente.cantidad >= 99) {
                alert("La cantidad máxima por producto es 99.");
                return;
            }
            existente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        renderCarrito();
    }

    function eliminarProducto(id) {
        carrito = carrito.filter(p => p.id !== id);
        renderCarrito();
    }

    function vaciarCarrito() {
        carrito = [];
        renderCarrito();
    }

    function renderCarrito() {
        carritoLista.innerHTML = "";
        let total = 0;
        if (carrito.length === 0) {
            carritoLista.innerHTML = `<p class="text-muted">No hay productos seleccionados.</p>`;
        }
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
            const item = document.createElement("div");
            item.classList.add("menu-card", "p-3", "mb-3");
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${producto.nombre}</h5>
                        <p class="mb-1">Cantidad: ${producto.cantidad}</p>
                        <p class="mb-0">Subtotal: $${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            carritoLista.appendChild(item);
        });
        carritoTotal.textContent = total;
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-agregar")) {
            const id = parseInt(e.target.dataset.id);
            // Buscar en la variable global window.productos que llenó menu_usuario.js
            const producto = window.productos.find(p => p.id === id);
            if (!producto) return;
            agregarAlCarrito(producto);
        }
        if (e.target.classList.contains("btn-eliminar")) {
            const id = parseInt(e.target.dataset.id);
            eliminarProducto(id);
        }
    });

    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito);
    }

    // LÓGICA DE PAGO
    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", async () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                alert("Inicia sesión para poder comprar.");
                window.location.href = "login.html";
                return;
            }

            // Adaptar para el backend: { items: [{ id_producto, cantidad }] }
            const items = carrito.map(p => ({
                id_producto: p.id,
                cantidad: p.cantidad
            }));

            try {
                btnConfirmar.disabled = true;
                btnConfirmar.textContent = "Procesando...";

                const res = await fetch("http://localhost:4000/api/pedidos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ items })
                });

                const data = await res.json();
                
                if (data.ok) {
                    alert("¡Pedido realizado con éxito!");
                    vaciarCarrito();
                    // Ocultar modal usando Bootstrap (si está abierto)
                    const modalEl = document.getElementById('carritoModal');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if(modal) modal.hide();
                } else {
                    alert("Error en el pedido: " + data.mensaje);
                }
            } catch (err) {
                console.error(err);
                alert("Hubo un error de conexión con el servidor.");
            } finally {
                btnConfirmar.disabled = false;
                btnConfirmar.textContent = "Confirmar pedido";
            }
        });
    }

    renderCarrito();
});