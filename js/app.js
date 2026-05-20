// LOGIN

const loginForm =
    document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", function(event){

        const correo =
            document.getElementById("loginCorreo").value;

        const password =
            document.getElementById("loginPassword").value;

        if(correo === "" || password === ""){

            event.preventDefault();

            alert("Completa todos los campos");

        }

    });

}

// REGISTRO

const registroForm =
    document.getElementById("registroForm");

if(registroForm){

    registroForm.addEventListener("submit", function(event){

        const password =
            document.getElementById("registroPassword").value;

        const confirmar =
            document.getElementById("confirmarPassword").value;

        if(password !== confirmar){

            event.preventDefault();

            alert("Las contraseñas no coinciden");

        }

    });

}