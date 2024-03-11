import { getRanking } from "./utils.js";

let position = [];
var ranking = getRanking();
// ['AlppZCuZL4CXReBgSWHI', 'Usuario1', 0]


// Esto crea un doble bucle el cual compara un valor de ranking con el resto para poner los de mayor puntuación primero.
function classification() {
    for (var i = 0; i < ranking.length; i++) {
        let aux = ["",""];
        for (var j = 0; j < ranking.length; j++) {
            if (repeat(ranking[j][1]) && aux[1] < ranking[j][2]) {
                aux = [ranking[j][1], ranking[j][2]];
            }
        }

        if (repeat(aux[0]) && aux[0] !== "") {
            position.push(aux);
        }
    }
    rerun();
    podium();
}


// En este función insertamos al HTML a los 5 primeros usuarios con la puntuación más alta.
function podium() {
    for (var i = 0; i < 5; i++){
        var rank = document.getElementById(`pos${i + 1}`);
        try {
            if (i < 3) {
                rank.innerHTML = `<p><strong>${position[i][0]}<br><br>Con ${position[i][1]} puntos</storng></p>`;
            } else {
                rank.innerHTML = `<p><strong>${position[i][0]}</strong></p><p><strong>Con ${position[i][1]} puntos</storng></p>`;
            }
        } catch {
            // o si ahi menos de 5 que aparezca un mensaje complementario.
            rank.innerHTML = `<p><strong>Aún nadie a conquistado este puesto<br>aun puede ser tuyo</strong></p>`;
        }
    }
}


// Esta función comprueba antes de insertar el usuario en la lista position que no este ya guardado en ella.
function repeat(r) {
    for (var i = 0; i < position.length; i++) {
        if (position[i][0] === r) {
            return false;
        }
    }
    return true;
}


// Dado a que siempre deja al último usuario fuera, esta funció sirve para dar una segunda vuelta y poner el restante.
function rerun() {
    for (var i = 0; i < ranking.length; i++) {
        if (repeat(ranking[i][1])) {
            position.push([ranking[i][1], ranking[i][2]]);
        }
    }
}

classification();