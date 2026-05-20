document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formResena");
    const listaResenas = document.getElementById("listaResenas");
    const sinResenas = document.getElementById("sinResenas");
    const template = document.getElementById("resenaTemplate");

    const resenas = [];

    // control de reseñas por día
    let contadorDia = 0;
    let ultimaFecha = new Date().toDateString();

    function resetContadorSiEsNuevoDia() {

        const hoy = new Date().toDateString();

        if (hoy !== ultimaFecha) {
            contadorDia = 0;
            ultimaFecha = hoy;
        }
    }

    function contarPalabras(texto) {
        return texto.trim().split(/\s+/).filter(Boolean).length;
    }

    function renderResenas(data) {

        listaResenas.innerHTML = "";

        if (!data || data.length === 0) {
            sinResenas.style.display = "block";
            return;
        }

        sinResenas.style.display = "none";

        data.forEach(r => {

            const clone = template.content.cloneNode(true);

            clone.querySelector(".resena-rating").textContent =
                "⭐".repeat(r.rating);

            clone.querySelector(".resena-comentario").textContent =
                r.comentario;

            listaResenas.appendChild(clone);

        });
    }

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        resetContadorSiEsNuevoDia();

        const rating = form.rating.value;
        const comentario = form.comentario.value;

        // VALIDACIÓN 1: máximo 3 reseñas por día
        if (contadorDia >= 3) {
            alert("Solo puedes dejar 3 reseñas por día.");
            return;
        }

        // VALIDACIÓN 2: máximo 70 palabras
        const palabras = contarPalabras(comentario);

        if (palabras > 70) {
            alert("Tu reseña no puede superar las 70 palabras.");
            return;
        }

        // si todo OK
        resenas.push({
            rating,
            comentario
        });

        contadorDia++;

        form.reset();

        renderResenas(resenas);

    });

    renderResenas(resenas);

});