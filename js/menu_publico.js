document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("contenedorMenu");

    const categorias = [...new Set(productos.map(p => p.categoria))];

    categorias.forEach(categoria => {

        // título categoría
        const titulo = document.createElement("h2");
        titulo.classList.add("category-title");
        titulo.textContent = categoria;

        contenedor.appendChild(titulo);

        // row bootstrap
        const row = document.createElement("div");
        row.classList.add("row", "g-4", "mb-5");

        // productos filtrados
        const productosCategoria = productos.filter(
            p => p.categoria === categoria
        );

        productosCategoria.forEach(producto => {

            const col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");

            col.innerHTML = `

                <div class="menu-card" data-id="${producto.id}">

                    <img src="${producto.imagen}" 
                         class="menu-img"
                         alt="${producto.nombre}">

                    <div class="menu-content">

                        <h3>${producto.nombre}</h3>

                        <p>${producto.descripcion}</p>

                        <div class="menu-footer">

                            <span class="price">
                                $${producto.precio}
                            </span>

                        </div>

                    </div>

                </div>

            `;

            row.appendChild(col);

        });

        contenedor.appendChild(row);

    });

});