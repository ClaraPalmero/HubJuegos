import { PrintBotonLetras } from "../../components";
import { game_over, iniciar } from "../../utils";
import "./Ahorcado.css";

//!----------------------------------TEMPLETE---------------------------------------------------

//!creo un templete con el body del juego para añadirlo a mi HTML

const template = () => `
<img id="imagen" src="img/img0.png" alt="Ahorcado" />
<div>
      <p id="palabra_a_adivinar"></p>
      <button id="jugar">Obtener palabra</button>

      <p id="resultado"></p>
      <div id="letras"></div> 
</div>`;

//!PINTO MI TEMPLETE EN EL HTML. Para eso le digo que me lo meta en app con el querySelector y con app.innerHTMl (esto porque es texto) le estoy diciendo que me meta el templete al HTML

const listeners = () => {
  const btn = document.getElementById("jugar");
  btn.addEventListener("click", iniciar);
};

export const PrintsGameTemplate = () => {
  document.querySelector("main").innerHTML = template();
  PrintBotonLetras();
  listeners();
  game_over();
};
