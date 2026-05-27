// Hacemos global los productos para que carrito.js pueda leerlos
window.productos = [];

document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedorMenu");

    try {
        const res = await fetch("http://localhost:4000/api/productos");
        const data = await res.json();
        
        if (!data.ok) throw new Error(data.mensaje);
        
        // Asignamos a la variable global y mapeamos id_producto a id para compatibilidad con carrito.js
        window.productos = data.data.map(p => ({
            ...p,
            id: p.id_producto,
            categoria: p.epoca // carrito.js podría requerir categoria
        }));

        const categorias = [...new Set(window.productos.map(p => p.categoria))];

        categorias.forEach(categoria => {
            const titulo = document.createElement("h2");
            titulo.classList.add("category-title");
            titulo.textContent = categoria;
            contenedor.appendChild(titulo);

            const row = document.createElement("div");
            row.classList.add("row", "g-4", "mb-5");

            const productosCategoria = window.productos.filter(p => p.categoria === categoria);

            productosCategoria.forEach(producto => {
                const col = document.createElement("div");
                col.classList.add("col-md-6", "col-lg-4");

                col.innerHTML = `
                    <div class="menu-card" data-id="${producto.id}">
                        <img src="${producto.imagen || 'img/default.jpg'}"
                             class="menu-img"
                             alt="${producto.nombre}">
                        <div class="menu-content">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion || ''}</p>
                            <div class="menu-footer mb-3">
                                <span class="price">$${producto.precio}</span>
                            </div>
                            <button 
                                class="btn btn-custom w-100 btn-agregar"
                                data-id="${producto.id}">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            });
            contenedor.appendChild(row);
        });

    } catch(err) {
        console.error("Error al cargar menú:", err);
        contenedor.innerHTML = "<p class='text-danger text-center'>Error al cargar el menú desde la base de datos.</p>";
    }
});