import { registro, ranking, getUsers } from "./utils.js";

var usuarios = getUsers();
// ['cqXYZ0Zr4kmfnpOGYBVn', 'Usuario1', '12']


// Esta función sirve para recoger tanto el nombre de usuario como la contraseña del registro para pasarselo a la función registro y ranking y creen al usuario.
function enviarRegistro() {
    var userID = randomID();
    var noExiste = true;
    document.getElementById('task-form').addEventListener('submit', function(event) {
        // Esto previne que al enviar la informacíon la pagina se recarge
        event.preventDefault();
        var username = document.getElementById('task-title').value;
        var password = document.getElementById('task-description').value;
        // Este for de aqui comprueba la lista de usuarios sección por sección para comprobar que el nombre no este repetido.
        // Además de comprobar que no le hemos pasado los datos vacios.
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i][1] === username || username == "" || password == "") {
                noExiste = false;
                break;
            }
        }
        
        if (noExiste) {
            registro(username, password, userID);
            ranking(userID, randomID());
            alert(`Te has registrado correctamente ${username}`);
        } else {
            alert("Nombre de usuario ya existente o datos vacios introducidos");
        }

        // Los dos setTimeout que ahi es para que la página se recarge en el tiempo exacto para que no corte 
        // la conexión con la base de datos y corte la creación o el inicio de sesión con el usuario.
        setTimeout(function() {
            location.reload();
        }, 150);
    });
}


// Esta función sirve para guardar la clave del usuario y un boolenao a ture en el localStorage.
function enviarInicioSesion() {
    var correcto = false;
    var posicion = -1;
    document.getElementById('task-form1').addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.getElementById('task-title1').value;
        var password = document.getElementById('task-description1').value;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i][1] === username && usuarios[i][2] === password) {
                correcto = true;
                posicion = i;
                break;
            }
        }

        if (correcto) {
            localStorage.userId = usuarios[posicion][0];
            localStorage.loggedIn = true;
            alert(`Has iniciado sesion correctamente ${username}`);
        } else {
            alert("Nombre o contraseña incorrectas");
        }

        setTimeout(function() {
            location.reload();
        }, 150);
    });
}


// Cuando creamos un id tanto para el usuario como para el ranking necesitamos ponerle un id aleatorio.
// Basicamente eso es lo que hace, crea una clave aleatoria de 20 digitos.
function randomID() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

enviarRegistro();
enviarInicioSesion();