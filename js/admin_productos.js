document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formProducto");
    const lista = document.getElementById("listaProductos");
    const sinProductos = document.getElementById("sinProductos");
    const template = document.getElementById("productoTemplate");

    const productos = [];

    function render() {

        lista.innerHTML = "";

        if (productos.length === 0) {
            sinProductos.style.display = "block";
            return;
        }

        sinProductos.style.display = "none";

        productos.forEach((p, index) => {

            const clone = template.content.cloneNode(true);

            clone.querySelector(".producto-nombre").textContent = p.nombre;
            clone.querySelector(".producto-descripcion").textContent = p.descripcion;
            clone.querySelector(".producto-precio").textContent = "$" + p.precio;

            // eliminar
            clone.querySelector(".btn-eliminar").addEventListener("click", () => {
                productos.splice(index, 1);
                render();
            });

            // editar básico
            clone.querySelector(".btn-editar").addEventListener("click", () => {
                alert("Esto después se conecta a backend (editar producto ID)");
            });

            lista.appendChild(clone);

        });
    }

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const nuevo = {
            nombre: form.nombre.value,
            descripcion: form.descripcion.value,
            precio: form.precio.value
        };

        productos.push(nuevo);

        form.reset();

        render();

    });

    render();

});