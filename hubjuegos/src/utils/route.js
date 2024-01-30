import { getUser } from "../global/state/globalState";
import {
  Login,
  PrintsGameTemplate, // importamos el print para que el switch lo pueda leer
  PrintPokemonPage,
  printTemplateDashboard,
} from "../pages";

export const initControler = (pagesRender) => {
  switch (pagesRender) {
    case undefined:
      localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
      break;
    case "Pokemon":
      PrintPokemonPage();
      break;
    case "Dashboard":
      printTemplateDashboard();
      break;
    case "Topo":
      "Topo()";
      break;
    case "Login":
      Login();
      break;
    case "Ahorcado":
      PrintsGameTemplate();
      break;
  }
};
