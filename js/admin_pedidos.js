document.addEventListener("DOMContentLoaded", async () => {
    const lista = document.getElementById("listaPedidosAdmin");
    const sinPedidos = document.getElementById("sinPedidosAdmin");
    const template = document.getElementById("pedidoAdminTemplate");

    async function cargarPedidos() {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:4000/api/pedidos", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            
            lista.innerHTML = "";
            if (!data.ok || data.data.length === 0) {
                sinPedidos.style.display = "block";
                return;
            }
            sinPedidos.style.display = "none";

            for(const p of data.data) {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".pedido-id").textContent = p.id_pedido;
                clone.querySelector(".pedido-fecha").textContent = new Date(p.fecha).toLocaleString();
                clone.querySelector(".pedido-total").textContent = "$" + p.total;

                // estado editable
                const estadoSelect = clone.querySelector(".pedido-estado");
                // Los estados permitidos en bd son: pendiente, en preparación, listo, entregado, cancelado
                estadoSelect.value = p.estado;

                estadoSelect.addEventListener("change", async (e) => {
                    const nuevoEstado = e.target.value;
                    try {
                        const updateRes = await fetch(`http://localhost:4000/api/pedidos/${p.id_pedido}/estado`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({ estado: nuevoEstado })
                        });
                        const updateData = await updateRes.json();
                        if(!updateData.ok) {
                            alert("Error: " + updateData.mensaje);
                            estadoSelect.value = p.estado; // revertir
                        } else {
                            p.estado = nuevoEstado;
                        }
                    } catch(err) {
                        alert("Error al actualizar estado");
                        estadoSelect.value = p.estado; // revertir
                    }
                });

                // Cargar productos del pedido
                const resDetalle = await fetch(`http://localhost:4000/api/pedidos/${p.id_pedido}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const dataDetalle = await resDetalle.json();
                
                const ul = clone.querySelector(".pedido-productos");
                if (dataDetalle.ok && dataDetalle.data.productos && dataDetalle.data.productos.length > 0) {
                    dataDetalle.data.productos.forEach(prod => {
                        const li = document.createElement("li");
                        li.textContent = `${prod.cantidad}x ${prod.nombre}`;
                        ul.appendChild(li);
                    });
                } else {
                    const li = document.createElement("li");
                    li.textContent = "Sin productos";
                    ul.appendChild(li);
                }

                lista.appendChild(clone);
            }
        } catch(err) {
            console.error("Error al cargar pedidos:", err);
        }
    }

    cargarPedidos();
});