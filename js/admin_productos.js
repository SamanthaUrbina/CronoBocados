document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaProductos");
    const sinProductos = document.getElementById("sinProductos");
    const form = document.getElementById("formProducto");
    const template = document.getElementById("productoTemplate");

    // usar productos reales
    let productosAdmin = [...productos];

    // render
    function renderProductos() {

        lista.innerHTML = "";

        if (productosAdmin.length === 0) {

            sinProductos.style.display = "block";

            return;
        }

        sinProductos.style.display = "none";

        productosAdmin.forEach(producto => {

            const clone = template.content.cloneNode(true);

            clone.querySelector(".producto-nombre").textContent =
                producto.nombre;

            clone.querySelector(".producto-descripcion").textContent =
                producto.descripcion;

            clone.querySelector(".producto-precio").textContent =
                "$" + producto.precio;

            // eliminar
            clone.querySelector(".btn-eliminar")
                .addEventListener("click", () => {

                    eliminarProducto(producto.id);

                });

            // editar (placeholder backend)
            clone.querySelector(".btn-editar")
                .addEventListener("click", () => {

                    alert(
                        "Aquí después se conectará la edición del producto ID: "
                        + producto.id
                    );

                });

            lista.appendChild(clone);

        });

    }

    // eliminar
    function eliminarProducto(id) {

        productosAdmin = productosAdmin.filter(
            p => p.id !== id
        );

        renderProductos();

    }

    // agregar
    form.addEventListener("submit", (e) => {

        e.preventDefault();

        // generar ID nuevo
        const nuevoID = productosAdmin.length > 0
            ? Math.max(...productosAdmin.map(p => p.id)) + 1
            : 1;

        const nuevoProducto = {

            id: nuevoID,

            nombre: form.nombre.value,

            descripcion: form.descripcion.value,

            precio: parseFloat(form.precio.value),

            imagen: "img/default.jpg",

            categoria: "Sin categoría"

        };

        productosAdmin.push(nuevoProducto);

        form.reset();

        renderProductos();

    });

    renderProductos();

});