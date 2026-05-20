let reservaciones = [];

const LIMITE_RESERVACIONES = 20;

const form = document.getElementById("formReservacion");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const fecha = form.querySelector('input[type="date"]').value;
    const hora = form.querySelector('input[type="time"]').value;
    const personas = parseInt(form.querySelector('input[type="number"]').value);
    const notas = form.querySelector("textarea").value;

    // VALIDAR LIMITE TOTAL
    if (reservaciones.length >= LIMITE_RESERVACIONES) {
        alert("Has alcanzado el máximo de 20 reservaciones.");
        return;
    }

    // VALIDAR FECHA PASADA
    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    const fechaSeleccionada = new Date(fecha);

    if (fechaSeleccionada < hoy) {
        alert("No puedes hacer reservaciones en fechas pasadas.");
        return;
    }

    // VALIDAR PERSONAS
    if (personas > 10) {
        alert("El máximo permitido es de 10 personas por reservación.");
        return;
    }

    // VALIDAR HORARIO
    const horaNum = parseInt(hora.split(":")[0]);

    if (horaNum < 8 || horaNum > 23) {
        alert("El horario disponible es de 8:00 AM a 11:00 PM.");
        return;
    }

    // VALIDAR NOTAS (100 palabras)
    const palabras = notas.trim().split(/\s+/).filter(Boolean);

    if (palabras.length > 100) {
        alert("Las notas no pueden exceder 100 palabras.");
        return;
    }

    // SI TODO OK
    reservaciones.push({
        fecha,
        hora,
        personas,
        notas
    });

    alert("Reservación enviada correctamente.");

    form.reset();
});