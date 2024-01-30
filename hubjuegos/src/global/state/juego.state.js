const infoJuego = {
  //creamos esta constante para incluir las constantes globales
  palabrita: "",
  cant_aciertos: 0,
  cant_errores: 0,
};

export const getInfoJuego = () => infoJuego; // get solo trae la info. creamos la función para que nos traiga una info del objeto de arriba

// los set me moificanel parámetro
export const setPalabrita = (data) => (infoJuego.palabrita = data);
export const setAciertos = (data) => (infoJuego.cant_aciertos = data);
export const setErrores = (data) => (infoJuego.cant_errores = data);
