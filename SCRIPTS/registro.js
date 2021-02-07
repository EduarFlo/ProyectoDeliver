window.onload = function () {
    document.getElementById("Google").innerHTML += "<span style='color: #1e90ff'>G</span><span style='color: #ff0000'>o</span><span style='color: #ffff00'>o</span><span style='color: #1e90ff'>g</span><span style='color: #00ad00'>l</span><span style='color: #ff0000'>e</span>";

    if (!(localStorage.getItem("users"))) {

        //Primera vez guarda los usuarios en localStorage
        console.log("Guardando registros de usuarios");

        /*let arreglo = {
            "users": [
                {
                    "email": "qwerty@gmail.com",
                    "password": "122333ASD",
                    "username": "asdfZXC",
                    "address": "Insurgentes"
                },
                {
                    "email": "poiu@yahoo.com",
                    "password": "kajs1092",
                    "username": "jcbodoque",
                    "address": "31 Minutos"
                }
            ]
        }*/

        fetch('/SCRiPTS/usuarios.json')
        .then(response => response.json())
        .then(data => {
            guardar(data);

        });

        function guardar(obj) {
            localStorage.setItem('users', JSON.stringify(obj));
        }

        //localStorage.setItem('users', JSON.stringify(arreglo));
    }
}

//Recuperación de usuarios guardados en localStorage

let registro = JSON.parse(localStorage.getItem('users'));

console.log("Abrir para ver usuarios para inicar sesión");
console.log(registro);





function validacionRegistro() {
    try {
        let pass = document.getElementById("reg-pass").value;
        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass))) {

            document.getElementById("alertPass").removeAttribute("hidden");
            return false; 

        }

        let email = document.getElementById("reg-email").value;
        let username = document.getElementById("reg-username").value;
        let address = document.getElementById("reg-address").value;

        //Saving data in localStorage

        let guardar = { "email": "", "password": "", "username": "", "address": "" };

        guardar.email = email;
        guardar.password = pass;
        guardar.username = username;
        guardar.address = address;


        console.log(guardar);

        let registro = JSON.parse(localStorage.getItem('users'));

        console.log(registro);

        registro.users.push(guardar);

        //Actualizamos la información

        localStorage.setItem('users', JSON.stringify(registro));

        console.log(registro);

        alert("Registro exitoso");

        return true;

    } catch (error) {
        console.error(error);
    }
}


function inicioSesion() {
    let email_l = document.getElementById("login-email").value;
    let pass_l = document.getElementById("login-pass").value;

    let registro = JSON.parse(localStorage.getItem('users'));
    let n = registro.users.length;
    console.log(n);

    let success = false;

    for (let i = 0; i < n; i++) {

        console.log(registro.users[i].email + " + " + registro.users[i].password);

        if (email_l == registro.users[i].email && pass_l == registro.users[i].password) {
            alert("Bienvenido " + registro.users[i].username);
            console.log("Inicio de sesión exitoso");
            success = true;
            
        }

    }

    if (success) {
        return true;
    } else {
        document.getElementById("alert-log").removeAttribute("hidden");
        return false;
    }


}

