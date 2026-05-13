import { rutas } from "./rutas.js";

export const enrrutador = async (app) => {
  let hash = window.location.hash;

  let temporal = rutas.find((ruta) => {
    return ruta.ruta == hash;
  })

  app.innerHTML = temporal.vista()
  await temporal.controlador()
}