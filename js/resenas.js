document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("formResena");
    const listaResenas = document.getElementById("listaResenas");
    const sinResenas = document.getElementById("sinResenas");
    const template = document.getElementById("resenaTemplate");

    function contarPalabras(texto) {
        return texto.trim().split(/\s+/).filter(Boolean).length;
    }

    async function cargarResenas() {
        try {
            const res = await fetch("http://localhost:4000/api/resenas");
            const data = await res.json();
            
            listaResenas.innerHTML = "";
            
            if (!data.ok || data.data.length === 0) {
                sinResenas.style.display = "block";
                return;
            }

            sinResenas.style.display = "none";

            data.data.forEach(r => {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".resena-rating").textContent = "⭐".repeat(r.calificacion);
                // Si la BD devuelve el nombre del autor, lo mostramos (o lo concatenamos)
                clone.querySelector(".resena-comentario").innerHTML = `<strong>${r.autor}:</strong> ${r.comentario}`;
                listaResenas.appendChild(clone);
            });
        } catch (err) {
            console.error("Error cargando reseñas:", err);
            sinResenas.style.display = "block";
            sinResenas.textContent = "No se pudieron cargar las reseñas.";
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para dejar una reseña.");
            window.location.href = "login.html";
            return;
        }

        const calificacion = form.rating.value;
        const comentario = form.comentario.value;

        // VALIDACIÓN: máximo 70 palabras
        if (contarPalabras(comentario) > 70) {
            alert("Tu reseña no puede superar las 70 palabras.");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/resenas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ calificacion, comentario })
            });

            const data = await res.json();
            if (data.ok) {
                form.reset();
                cargarResenas(); // Recargar la lista
            } else {
                alert(data.mensaje); // Mostrará "Solo 3 reseñas por día" si llega al límite
            }
        } catch (err) {
            console.error(err);
            alert("Hubo un error al enviar tu reseña.");
        }
    });

    // Cargar al inicio
    cargarResenas();
});