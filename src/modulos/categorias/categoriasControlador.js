import { get } from "@/utilidad/solicitudes";
import { categorias } from "./listarCategorias";

export const categoriasControlador = async () => {
  const editable = document.querySelector('div > div');
  const data = await get('categorias');

  editable.innerHTML = categorias(data);
}