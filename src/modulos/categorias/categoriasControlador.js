import { get } from "@/utilidad/solicitudes";
import { categorias } from "./listarCategorias";

export const categoriasControlador = async () => {
  const btnEditar = document.querySelector("#btnEditar");
  const editable = document.querySelector('div > div');
  const data = await get('categorias');

  editable.innerHTML = categorias(data);

  if (btnEditar){
    usersBtn.addEventListener('click', () => {
            window.location.hash = "#/categorias/editar";
        });
      }
}
