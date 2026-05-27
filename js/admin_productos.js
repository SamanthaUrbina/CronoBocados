document.addEventListener("DOMContentLoaded", async () => {
    const lista = document.getElementById("listaProductos");
    const sinProductos = document.getElementById("sinProductos");
    const form = document.getElementById("formProducto");
    const template = document.getElementById("productoTemplate");

    async function cargarProductos() {
        try {
            const res = await fetch("http://localhost:4000/api/productos");
            const data = await res.json();
            
            lista.innerHTML = "";
            if (!data.ok || data.data.length === 0) {
                sinProductos.style.display = "block";
                return;
            }
            sinProductos.style.display = "none";

            data.data.forEach(producto => {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".producto-nombre").textContent = producto.nombre;
                clone.querySelector(".producto-descripcion").textContent = producto.descripcion;
                clone.querySelector(".producto-precio").textContent = "$" + producto.precio;

                // eliminar
                clone.querySelector(".btn-eliminar").addEventListener("click", async () => {
                    if(!confirm("¿Seguro que quieres eliminar este producto?")) return;
                    
                    const token = localStorage.getItem("token");
                    try {
                        const delRes = await fetch(`http://localhost:4000/api/productos/${producto.id_producto}`, {
                            method: "DELETE",
                            headers: { "Authorization": `Bearer ${token}` }
                        });
                        const delData = await delRes.json();
                        if(delData.ok) {
                            cargarProductos();
                        } else {
                            alert(delData.mensaje);
                        }
                    } catch(err) {
                        alert("Error al eliminar");
                    }
                });

                // editar (placeholder)
                clone.querySelector(".btn-editar").addEventListener("click", () => {
                    alert("Para editar productos, se debe abrir un modal de edición en futuras versiones. (ID: " + producto.id_producto + ")");
                });

                lista.appendChild(clone);
            });
        } catch(err) {
            console.error(err);
        }
    }

    // agregar
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return alert("No estás autorizado");

        const nombre = form.nombre.value;
        const descripcion = form.descripcion.value;
        const precio = parseFloat(form.precio.value);

        try {
            const res = await fetch("http://localhost:4000/api/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, descripcion, precio, epoca: "Nueva" })
            });
            const data = await res.json();
            if(data.ok) {
                form.reset();
                cargarProductos();
            } else {
                alert(data.mensaje);
            }
        } catch(err) {
            alert("Error al crear producto");
        }
    });

    cargarProductos();
});