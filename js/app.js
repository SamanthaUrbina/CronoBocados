// LOGIN
const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", async function(event){
        event.preventDefault(); // Evita que la página se recargue

        const correo = document.getElementById("loginCorreo").value;
        const contrasena = document.getElementById("loginPassword").value;

        if(correo === "" || contrasena === ""){
            alert("Completa todos los campos");
            return;
        }

        try {
            // Llama a la API del backend que creamos
            const res = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, contrasena })
            });
            const data = await res.json();
            
            if(data.ok){
                // Guardamos el token y el usuario en el navegador
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                
                alert("¡Bienvenido " + data.usuario.nombre + "!");
                
                // Redirigir según el rol
                if(data.usuario.rol === 'admin'){
                    window.location.href = "admin_pedidos.html"; // O admin.html según tu estructura
                } else {
                    window.location.href = "menu_usuario.html";
                }
            } else {
                alert("Error al iniciar sesión: " + data.mensaje);
            }
        } catch(err) {
            console.error(err);
            alert("No se pudo conectar con el servidor. ¿Está encendido el backend?");
        }
    });
}

// REGISTRO
const registroForm = document.getElementById("registroForm");
if(registroForm){
    registroForm.addEventListener("submit", async function(event){
        event.preventDefault(); // Evita que la página se recargue
        
        const nombre = document.getElementById("registroNombre").value;
        const correo = document.getElementById("registroCorreo").value;
        const password = document.getElementById("registroPassword").value;

        // Validar contraseña si existe el campo confirmarPassword en el HTML
        const confirmarElem = document.getElementById("confirmarPassword");
        if(confirmarElem && password !== confirmarElem.value){
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/auth/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, contrasena: password })
            });
            const data = await res.json();
            
            if(data.ok){
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                
                alert("¡Cuenta creada con éxito!");
                window.location.href = "menu_usuario.html";
            } else {
                alert("Error en el registro: " + data.mensaje);
            }
        } catch(err) {
            console.error(err);
            alert("No se pudo conectar con el servidor. ¿Está encendido el backend?");
        }
    });
}