document.addEventListener("DOMContentLoaded", async () => {
    const listaPedidos = document.getElementById("listaPedidos");
    const sinPedidos = document.getElementById("sinPedidos");
    const template = document.getElementById("pedidoTemplate");

    async function cargarPedidos() {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "login.html";
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/pedidos", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();

            listaPedidos.innerHTML = "";

            if (!data.ok || data.data.length === 0) {
                sinPedidos.style.display = "block";
                return;
            }

            sinPedidos.style.display = "none";

            // Para cada pedido, necesitamos su detalle para mostrar los productos
            for (const pedido of data.data) {
                // Hacer un fetch individual para obtener los productos de ese pedido
                const resDetalle = await fetch(`http://localhost:4000/api/pedidos/${pedido.id_pedido}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const dataDetalle = await resDetalle.json();
                
                const clone = template.content.cloneNode(true);
                clone.querySelector(".pedido-id").textContent = pedido.id_pedido;
                clone.querySelector(".pedido-estado").textContent = pedido.estado.toUpperCase();
                
                // Formatear la fecha
                const fecha = new Date(pedido.fecha).toLocaleString();
                clone.querySelector(".pedido-fecha").textContent = fecha;
                clone.querySelector(".pedido-total").textContent = `$${pedido.total}`;

                const ul = clone.querySelector(".pedido-productos");
                
                if (dataDetalle.ok && dataDetalle.data.productos && dataDetalle.data.productos.length > 0) {
                    dataDetalle.data.productos.forEach(prod => {
                        const li = document.createElement("li");
                        li.textContent = `${prod.cantidad}x ${prod.nombre}`;
                        ul.appendChild(li);
                    });
                } else {
                    const li = document.createElement("li");
                    li.textContent = "Detalles no disponibles";
                    ul.appendChild(li);
                }

                listaPedidos.appendChild(clone);
            }
        } catch (err) {
            console.error("Error cargando pedidos:", err);
            sinPedidos.style.display = "block";
            sinPedidos.textContent = "Hubo un error al cargar los pedidos desde el servidor.";
        }
    }

    cargarPedidos();
});