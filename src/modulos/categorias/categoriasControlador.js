import { get } from "../../utilidad/solicitudes";
import { categorias } from "./listarCategorias.js"; 

export const categoriasControlador = async () => {
  
  const edicion = document.querySelector("div > div");
  const data = await get('categorias');

  edicion.innerHTML = categorias(data);

}