document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaReservaciones");
    const sinReservaciones = document.getElementById("sinReservaciones");
    const template = document.getElementById("reservacionTemplate");

    const reservaciones = [];

    function render() {

        lista.innerHTML = "";

        if (reservaciones.length === 0) {

            sinReservaciones.style.display = "block";

            return;
        }

        sinReservaciones.style.display = "none";

        reservaciones.forEach(res => {

            const clone = template.content.cloneNode(true);

            clone.querySelector(".res-id").textContent = res.id;
            clone.querySelector(".res-cliente").textContent = res.cliente;
            clone.querySelector(".res-fecha").textContent = res.fecha;
            clone.querySelector(".res-hora").textContent = res.hora;
            clone.querySelector(".res-personas").textContent = res.personas;
            clone.querySelector(".res-notas").textContent = res.notas;

            const badge = clone.querySelector(".estado-badge");

            // aceptar
            clone.querySelector(".btn-aceptar")
                .addEventListener("click", () => {

                    badge.textContent = "Aceptada";

                    badge.classList.remove("bg-warning");

                    badge.classList.add("bg-success");

                });

            // rechazar
            clone.querySelector(".btn-rechazar")
                .addEventListener("click", () => {

                    badge.textContent = "Rechazada";

                    badge.classList.remove("bg-warning");

                    badge.classList.add("bg-danger");

                });

            lista.appendChild(clone);

        });

    }

    render();

});