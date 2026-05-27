document.addEventListener("DOMContentLoaded", async () => {
    const lista = document.getElementById("listaReservaciones");
    const sinReservaciones = document.getElementById("sinReservaciones");
    const template = document.getElementById("reservacionTemplate");

    async function cargarReservaciones() {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:4000/api/reservaciones", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            
            lista.innerHTML = "";
            if (!data.ok || data.data.length === 0) {
                sinReservaciones.style.display = "block";
                return;
            }

            sinReservaciones.style.display = "none";

            data.data.forEach(r => {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".res-id").textContent = r.id_reservacion;
                clone.querySelector(".res-cliente").textContent = r.cliente;
                clone.querySelector(".res-fecha").textContent = new Date(r.fecha).toLocaleDateString();
                clone.querySelector(".res-hora").textContent = new Date(r.hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                clone.querySelector(".res-personas").textContent = r.personas;
                clone.querySelector(".res-notas").textContent = "N/A"; // No hay notas en BD

                const badge = clone.querySelector(".estado-badge");
                
                // Las reservaciones en la BD actualmente no tienen un campo "estado",
                // por lo que los botones Aceptar/Rechazar solo serán visuales por ahora.
                clone.querySelector(".btn-aceptar").addEventListener("click", () => {
                    badge.textContent = "Aceptada";
                    badge.classList.remove("bg-warning");
                    badge.classList.add("bg-success");
                });

                clone.querySelector(".btn-rechazar").addEventListener("click", () => {
                    badge.textContent = "Rechazada";
                    badge.classList.remove("bg-warning");
                    badge.classList.add("bg-danger");
                });

                lista.appendChild(clone);
            });
        } catch(err) {
            console.error("Error al cargar reservaciones:", err);
        }
    }

    cargarReservaciones();
});