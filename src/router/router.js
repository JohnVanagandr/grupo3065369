import { rutas } from "./rutas.js";

export const enrrutador = () => {
  let hash = window.location.hash;

  let temporal = rutas.find((ruta) => ruta.ruta == hash);

  temporal.controlador()



  // if (hash == "#/categorias") {

  //   console.log(rutas);
  //   console.log(hash);

  //   // console.log(rutas().armarCategorias());

  //   // rutas().armarCategorias()
  // }
  // if (hash == "#/productos") {
  //   // rutas.armarProductos()
  //   console.log(rutas);
  // }
}