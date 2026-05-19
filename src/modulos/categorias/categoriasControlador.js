import { get } from "../../helpers";
import { categorias } from "./listarCategorias.js";

export const categoriasControlador = async () => {
  const editable = document.querySelector(`div > div`)
  const data = await get('categorias');

  editable.innerHTML = categorias(data)
  // const componente = categorias(data)
}

