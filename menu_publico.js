document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedorMenu");

    try {
        const res = await fetch("http://localhost:4000/api/productos");
        const data = await res.json();
        
        if (!data.ok) throw new Error(data.mensaje);
        const productos = data.data;

        // Extraer categorias (epocas) únicas
        const categorias = [...new Set(productos.map(p => p.epoca))];

        categorias.forEach(categoria => {
            const titulo = document.createElement("h2");
            titulo.classList.add("category-title");
            titulo.textContent = categoria;
            contenedor.appendChild(titulo);

            const row = document.createElement("div");
            row.classList.add("row", "g-4", "mb-5");

            const productosCategoria = productos.filter(p => p.epoca === categoria);

            productosCategoria.forEach(producto => {
                const col = document.createElement("div");
                col.classList.add("col-md-6", "col-lg-4");

                col.innerHTML = `
                    <div class="menu-card" data-id="${producto.id_producto}">
                        <img src="${producto.imagen || 'img/default.jpg'}" 
                             class="menu-img"
                             alt="${producto.nombre}">
                        <div class="menu-content">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion || ''}</p>
                            <div class="menu-footer">
                                <span class="price">$${producto.precio}</span>
                            </div>
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