import { palabras } from "../global/data/juego.data";
import {
  getInfoJuego,
  setAciertos,
  setErrores,
  setPalabrita,
} from "../global/state/juego.state";

//?---1--- Esta función sirve para crear un número aleatorio ---
export const obtenerNumeroRandom = (num_min, num_max) => {
  const amplitud_valores = num_max - num_min; //valor más alto - valor más bajo del random... (7 - 0), estos valores están en data
  const valor_al_azar =
    Math.floor(Math.random() * amplitud_valores) +
    num_min; /* 5 - 15 = 10 + 5 */
  //math.floor redondea hacia abajo / math.random te da entre 0 y 1
  return valor_al_azar;
};

//?---2--- Función para que al iniciar no salga ningún mensaje ---

export const iniciar = (event) => {
  document.getElementById("resultado").innerHTML = "";
  const imagen = document.getElementById("imagen"); // busco en html la imagen
  imagen.src = "img/img0.png"; // inyecto la imagen
  const btn = document.getElementById("jugar");
  btn.disabled = true; // para que cada vez que le doy al boton de jugar esté desabilitado hasta que inicie el juego
  setErrores(0); // llamo al set dentro de 'juego.state'. Y quiero que me lo deje en 0 porqué es el inicio
  setAciertos(0); // pongo 0 pq quiero que el juego empieze con 0 aciertos.

  //?------ para crear la palabra -------------
  const parrafo = document.getElementById("palabra_a_adivinar");
  parrafo.innerHTML = ""; // cada vez que empiece me deja el span vacío (las rallitas).

  const cant_palabras = palabras.length; // me tiene que medir la palabra para saber cuantas rallitas ponemos.
  const valor_al_azar = obtenerNumeroRandom(0, cant_palabras); // con esta constante sabemos cuantas palabras tengo, 0 = num-min y cant_palabras = num_max

  setPalabrita(palabras[valor_al_azar]); // el valor al azar que me sale lo relaciona con mi palabra
  const cant_letras = getInfoJuego().palabrita.length; // esta constante nos trae la información del juego, en este caso la clave palabrita y sus letras

  const btn_letras = document.querySelectorAll("#letras button"); // llamo al elemento de html porque o voy a usar en la siguiente linea

  for (let i = 0; i < btn_letras.length; i++) {
    // para habilitar las letras al inicio
    btn_letras[i].disabled = false; // [i] es para que se vaya viendo la posición de cda letra
  }
  //?-------- para que me cree un span por cada letra, las rallitas ------------

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span"); // por cada letra se añade un span, una rallita
    parrafo.appendChild(span); // creamos un nuevo nodo hijo
  }
};

//?---3--- Función para interactuar con las letras del juego una vez iniciado, para que la active y aparezca en el span ----
export const click_letras = (event) => {
  // hace referencia a la letra clicada
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target; // el target detecta que evento he puesto, que letra estoy tocando
  button.disabled = true; // para que cuando toco una tecla se desabilite

  const letra = button.innerHTML.toLowerCase(); // que cada letra que pase del html me lo pase a minuscula
  const palabra = getInfoJuego().palabrita.toLowerCase(); // y por seguridad que tb lo haga en la palabrita en state

  let acierto = false; //ponemos un let pq vamos a ir incrementando más adelante
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      // si la letra es igual a alguna de las letras de la palabra
      spans[i].innerHTML = letra;
      let aciertos = parseInt(getInfoJuego().cant_aciertos);
      setAciertos(aciertos + 1);
      acierto = true; // si todo se cumple, es decir, si esta la letra de mi palabra = true
    }
  }
  //?---- vamos a ver que pasa si fallo ----

  if (acierto == false) {
    let fallos = parseInt(getInfoJuego().cant_errores);
    setErrores(fallos + 1);
    const fotoError = `img/img${getInfoJuego().cant_errores}.png`; // para que mi imagen vaya cambiando cuando hay un error, paso de imágens dinámico
    const imagen = document.getElementById("imagen"); // llamo a imagen
    imagen.src = fotoError; // y que me muestre mi imagen conforme voy teniendo errores
  }

  if (getInfoJuego().cant_errores == 7) {
    // si mi cantidad de errores es 7, quiero que la parte del resultado demi html
    document.getElementById("resultado").innerHTML =
      "Lástima, la palabra era " + getInfoJuego().palabrita;
    game_over();
  } else if (getInfoJuego().cant_aciertos == getInfoJuego().palabrita.length) {
    document.getElementById("resultado").innerHTML = "BIEEEEN!! HAS GANADO!!";
    game_over();
  }
  console.log(
    "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acierto
  );
};

export const game_over = () => {
  const btn_letras = document.querySelectorAll("#letras button");
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }
  const btn = document.getElementById("jugar");
  btn.disabled = false;
};
