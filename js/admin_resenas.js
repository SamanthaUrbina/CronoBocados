document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaResenasAdmin");

    const sinResenas = document.getElementById("sinResenasAdmin");

    const template = document.getElementById("resenaAdminTemplate");

    let resenas = [];

    // renderizar reseñas
    function render() {

        lista.innerHTML = "";

        if (resenas.length === 0) {

            sinResenas.style.display = "block";

            return;

        }

        sinResenas.style.display = "none";

        resenas.forEach(resena => {

            const clone = template.content.cloneNode(true);

            // card principal
            const card = clone.querySelector(".resena-card");

            // ID HTML
            card.dataset.id = resena.id;

            // contenido
            clone.querySelector(".resena-id").textContent =
                resena.id;

            clone.querySelector(".resena-usuario").textContent =
                resena.usuario;

            clone.querySelector(".resena-comentario").textContent =
                resena.comentario;

            clone.querySelector(".resena-rating").textContent =
                "⭐".repeat(resena.rating);

            // eliminar reseña
            clone.querySelector(".btn-eliminar")
                .addEventListener("click", () => {

                    eliminarResena(resena.id);

                });

            lista.appendChild(clone);

        });

    }

    // eliminar
    function eliminarResena(id) {

        resenas = resenas.filter(r => r.id !== id);

        render();

    }

    render();

});