window.onload = function () {

    if (!(localStorage.getItem("bussines"))) {

        //Primera vez guarda los usuarios en localStorage
        console.log("Guardando registros de usuarios");

        let arreglo = {
            "bussines": [
                {
                    "email": "star@bucks.com",
                    "password": "exp3nsivecoffe",
                    "logo": "img.png",
                    "brand": "Starbucks",
                    "address": "Carmen Ochoa",
                    "type": "Coffe",
                    "phone": "9832673370",
                    "whatsapp": "9832673370"

                }
            ]
        }

        localStorage.setItem('bussines', JSON.stringify(arreglo));

    }
}

//Recuperación de negocios guardados en localStorage
let registro = JSON.parse(localStorage.getItem('bussines'));

console.log("Abrir para ver datos para inicar sesión");
console.log(registro);

function validacionRegistro() {
    try {
        let pass = document.getElementById("reg-pass").value;
        let phone = document.getElementById("reg-phone").value;
        let whats = document.getElementById("reg-whats").value;
        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass))) {
            document.getElementById("alertPass").removeAttribute("hidden");
            return false;
        }
        if ((!(/^[0-9]{10}$/.test(phone))) || (!(/^[0-9]{10}$/.test(whats)))) {
            document.getElementById("alert-num").removeAttribute("hidden");
            return false;
        }
        let email = document.getElementById("reg-email").value;
        let brand = document.getElementById("reg-brand").value;
        let address = document.getElementById("reg-address").value;
        let type = document.getElementById("reg-giro").value;
        let logo = document.getElementById("reg-logo").value;

        //Saving data in localStorage

        let guardar = { "email": "", "password": "", "logo": "", "brand": "", "address": "", "type": "", "phone": "", "whatsapp": "" };

        guardar.email = email;
        guardar.password = pass;
        guardar.logo = logo;
        guardar.brand = brand;
        guardar.address = address;
        guardar.type = type;
        guardar.phone = phone;
        guardar.whatsapp = whats;


        console.log(guardar);

        let registro = JSON.parse(localStorage.getItem('bussines'));

        console.log(registro);

        registro.bussines.push(guardar);

        //Updating info at localStorage

        localStorage.setItem('bussines', JSON.stringify(registro));

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

    let registro = JSON.parse(localStorage.getItem('bussines'));
    let n = registro.bussines.length;
    console.log(n);

    let success = false;

    for (let i = 0; i < n; i++) {

        console.log(registro.bussines[i].email + " + " + registro.bussines[i].password);

        if (email_l == registro.bussines[i].email && pass_l == registro.bussines[i].password) {
            success = true;
            alert("Bienvenido " + registro.bussines[i].brand);
            console.log("Inicio de sesión exitoso");
        }

    }

    if (success) {

        return true;
    } else {
        document.getElementById("alert-log").removeAttribute("hidden");
        return false;
    }
}