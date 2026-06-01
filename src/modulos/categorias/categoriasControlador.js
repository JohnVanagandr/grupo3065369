import { get } from "@/utilidad/solicitudes";
import { categorias } from "./listarCategorias";
import { btnEliminar } from "@/components/btnEliminar";
import { btnEditar } from "@/components/btnEditar";

export const categoriasControlador = async () => {
  const editable = document.querySelector('div > div');
  const data = await get('categorias');

  editable.innerHTML = categorias(data);

  const contenedores = editable.querySelectorAll('.contenedor-acciones');
  // Usamos forEach ya que hay múltiples contenedores de acciones (uno por cada elemento de la lista) y debemos recorrerlos todos
  contenedores.forEach(contenedor => {
    // Obtenemos el id mediante data-id (y no por clase) porque cada fila/tarjeta tiene un identificador único de base de datos necesario para las acciones de editar/eliminar
    const id = contenedor.getAttribute('data-id');
    contenedor.appendChild(btnEditar(id));
    contenedor.appendChild(btnEliminar(id));
  });
}
