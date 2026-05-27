document.addEventListener("DOMContentLoaded", async () => {
    const lista = document.getElementById("listaResenasAdmin");
    const sinResenas = document.getElementById("sinResenasAdmin");
    const template = document.getElementById("resenaAdminTemplate");

    async function cargarResenas() {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:4000/api/resenas");
            const data = await res.json();
            
            lista.innerHTML = "";
            if (!data.ok || data.data.length === 0) {
                sinResenas.style.display = "block";
                return;
            }
            sinResenas.style.display = "none";

            data.data.forEach(resena => {
                const clone = template.content.cloneNode(true);
                const card = clone.querySelector(".resena-card");
                card.dataset.id = resena.id_resena;

                clone.querySelector(".resena-id").textContent = resena.id_resena;
                clone.querySelector(".resena-usuario").textContent = resena.autor;
                clone.querySelector(".resena-comentario").textContent = resena.comentario;
                clone.querySelector(".resena-rating").textContent = "⭐".repeat(resena.calificacion);

                // eliminar reseña
                clone.querySelector(".btn-eliminar").addEventListener("click", async () => {
                    if(!confirm("¿Seguro que deseas eliminar esta reseña?")) return;
                    
                    try {
                        const delRes = await fetch(`http://localhost:4000/api/resenas/${resena.id_resena}`, {
                            method: "DELETE",
                            headers: { "Authorization": `Bearer ${token}` }
                        });
                        const delData = await delRes.json();
                        if(delData.ok) {
                            cargarResenas();
                        } else {
                            alert(delData.mensaje);
                        }
                    } catch(err) {
                        alert("Error al eliminar reseña");
                    }
                });

                lista.appendChild(clone);
            });
        } catch(err) {
            console.error("Error al cargar reseñas:", err);
        }
    }

    cargarResenas();
});