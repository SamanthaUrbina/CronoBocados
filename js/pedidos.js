document.addEventListener("DOMContentLoaded", () => {

    const listaPedidos = document.getElementById("listaPedidos");
    const sinPedidos = document.getElementById("sinPedidos");
    const template = document.getElementById("pedidoTemplate");


    const pedidos = [];

    function renderPedidos(data) {

        // limpiar contenedor
        listaPedidos.innerHTML = "";

        if (!data || data.length === 0) {
            sinPedidos.style.display = "block";
            return;
        }

        sinPedidos.style.display = "none";

        data.forEach(pedido => {

            const clone = template.content.cloneNode(true);

            // llenar datos básicos
            clone.querySelector(".pedido-id").textContent = pedido.id;
            clone.querySelector(".pedido-estado").textContent = pedido.estado;
            clone.querySelector(".pedido-fecha").textContent = pedido.fecha;
            clone.querySelector(".pedido-total").textContent = pedido.total;

            // llenar productos
            const ul = clone.querySelector(".pedido-productos");

            if (pedido.productos && pedido.productos.length > 0) {

                pedido.productos.forEach(prod => {

                    const li = document.createElement("li");
                    li.textContent = prod;
                    ul.appendChild(li);

                });

            } else {

                const li = document.createElement("li");
                li.textContent = "Sin productos registrados";
                ul.appendChild(li);

            }

            listaPedidos.appendChild(clone);

        });
    }
    renderPedidos(pedidos);

});