document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaPedidosAdmin");
    const sinPedidos = document.getElementById("sinPedidosAdmin");
    const template = document.getElementById("pedidoAdminTemplate");

    const pedidos = [];

    function render() {

        lista.innerHTML = "";

        if (pedidos.length === 0) {
            sinPedidos.style.display = "block";
            return;
        }

        sinPedidos.style.display = "none";

        pedidos.forEach(p => {

            const clone = template.content.cloneNode(true);

            clone.querySelector(".pedido-id").textContent = p.id;
            clone.querySelector(".pedido-fecha").textContent = p.fecha;
            clone.querySelector(".pedido-total").textContent = p.total;

            // estado editable
            const estadoSelect = clone.querySelector(".pedido-estado");
            estadoSelect.value = p.estado;

            estadoSelect.addEventListener("change", (e) => {
                p.estado = e.target.value;
            });

            // productos
            const ul = clone.querySelector(".pedido-productos");

            if (p.productos && p.productos.length > 0) {

                p.productos.forEach(prod => {
                    const li = document.createElement("li");
                    li.textContent = prod;
                    ul.appendChild(li);
                });

            } else {
                const li = document.createElement("li");
                li.textContent = "Sin productos";
                ul.appendChild(li);
            }

            lista.appendChild(clone);

        });
    }

    render();

});