const form = document.getElementById("formReservacion");

if(form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para hacer una reservación.");
            window.location.href = "login.html";
            return;
        }

        const fecha = form.querySelector('input[type="date"]').value;
        const hora = form.querySelector('input[type="time"]').value;
        const personas = parseInt(form.querySelector('input[type="number"]').value);

        // VALIDAR FECHA PASADA
        const hoy = new Date();
        hoy.setHours(0,0,0,0);
        const fechaSeleccionada = new Date(fecha);
        if (fechaSeleccionada < hoy) {
            alert("No puedes hacer reservaciones en fechas pasadas.");
            return;
        }

        // VALIDAR PERSONAS
        if (personas > 10 || personas < 1) {
            alert("El número de personas debe ser entre 1 y 10.");
            return;
        }

        // VALIDAR HORARIO
        const horaNum = parseInt(hora.split(":")[0]);
        if (horaNum < 8 || horaNum > 23) {
            alert("El horario disponible es de 8:00 AM a 11:00 PM.");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/reservaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ fecha, hora, personas })
            });

            const data = await res.json();
            
            if (data.ok) {
                alert("¡Reservación guardada con éxito en la base de datos!");
                form.reset();
            } else {
                alert("Error al reservar: " + data.mensaje);
            }
        } catch (err) {
            console.error(err);
            alert("Hubo un error de conexión con el servidor.");
        }
    });
}