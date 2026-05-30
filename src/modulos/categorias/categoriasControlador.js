import { get } from "@/utilidad/solicitudes";
import { categorias } from "./listarCategorias";
import { eliminarCategoria } from "@/helpers/api/delete";

export const categoriasControlador = async () => {
  const editable = document.querySelector('div > div');
  const data = await get('categorias');

  editable.innerHTML = categorias(data);


   const botonesEliminar = document.querySelectorAll('.btn-eliminar');

  botonesEliminar.forEach((boton) => {

    boton.addEventListener('click', async () => {

      const id = boton.dataset.id;

      const tarjeta = boton.closest('.tarjeta-categoria');

      await eliminarCategoria(id, tarjeta);
    });
 });

}
