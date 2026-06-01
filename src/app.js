// import { get } from "./helpers/get.js";

import { enrrutador } from "./router/router.js";


const nav = document.querySelector("nav");
const editable = document.querySelector("#editable");

const arrancar = () => {
  // ANTES: Había dos llamadas a enrrutador(), una con el parámetro 'editable' y otra sin parámetro
  // CAMBIO: Se eliminó la segunda llamada enrrutador() sin parámetro
  // POR QUÉ: La segunda llamada causaba que 'app' fuera undefined en router.js:10 al intentar setear innerHTML,
  // generando el error "Cannot set properties of undefined (setting 'innerHTML')"
  enrrutador(editable)
}

window.addEventListener('hashchange', arrancar);

document.addEventListener('DOMContentLoaded', arrancar)


