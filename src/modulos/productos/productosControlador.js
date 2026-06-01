// ANTES: Solo se obtenían los productos de la API y se renderizaban directamente.
// CAMBIO: Se añadió la obtención secuencial de categorías y el enriquecimiento de datos de los productos con su categoría y clase de color.
// POR QUÉ: Permite separar la lógica de negocio y de mapeo de datos de la plantilla pura en listarProductos.js.

import { get } from "@/utilidad/solicitudes";
import { productos } from "./listarProductos";
import { btnEliminar } from "@/components/btnEliminar";
import { btnEditar } from "@/components/btnEditar";
import { obtenerClaseColorCategoria } from "@/helpers/index.js";

// Controlador que gestiona la carga y muestra de productos
export const productosControlador = async () => {
  // Buscamos el contenedor donde se insertará la lista en el DOM
  const editable = document.querySelector('div > div');

  // Obtenemos los productos y categorías desde la base de datos
  const dataProductos = await get('productos');
  const dataCategorias = await get('categorias');

  // Recorremos cada producto para asociarle los datos de su categoría
  const productosEnriquecidos = dataProductos.map(prod => {
    const categoria = dataCategorias.find(c => String(c.id) === String(prod.categoriaId));

    return {
      ...prod,
      nombreCategoria: categoria ? categoria.nombre : "Sin categoría",
      claseBadge: obtenerClaseColorCategoria(prod.categoriaId)
    };
  });

  // Generamos el HTML e insertamos en el contenedor
  editable.innerHTML = productos(productosEnriquecidos);

  // --- SECCIÓN 1: BOTONES DE CADA PRODUCTO (EDITAR / ELIMINAR) ---
  const contenedores = editable.querySelectorAll('.contenedor-acciones');

  contenedores.forEach(contenedor => {
    const id = contenedor.getAttribute('data-id');

    const editarBtn = btnEditar("productos", id);
    const eliminarBtn = btnEliminar(id);

    contenedor.appendChild(editarBtn);
    contenedor.appendChild(eliminarBtn);

    editarBtn.addEventListener('click', () => {
      sessionStorage.setItem("editId", id);
      window.location.hash = "#/productos/editar";
    });
  });


};