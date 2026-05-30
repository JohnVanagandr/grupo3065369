import { get } from "@/utilidad/solicitudes";
import { productos } from "./listarProductos";
import { eliminarProducto } from "@/helpers/api/delete";

export const productosControlador = async () => {
  const editable = document.querySelector('div > div');
  const data = await get('productos');

  editable.innerHTML = productos(data);

  const botonesEliminar = document.querySelectorAll('.btn-eliminar');

  botonesEliminar.forEach((boton) => {

    boton.addEventListener('click', async () => {

      const id = boton.dataset.id;

      const tarjeta = boton.closest('.tarjeta-producto');

      await eliminarProducto(id, tarjeta);
    });
 });

}

