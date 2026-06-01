// ANTES: Solo se obtenían los productos de la API y se renderizaban directamente.
// CAMBIO: Se añadió la obtención secuencial de categorías y el enriquecimiento de datos de los productos con su categoría y clase de color.
// POR QUÉ: Permite separar la lógica de negocio y de mapeo de datos de la plantilla pura en listarProductos.js.

import { get } from "@/utilidad/solicitudes";
import { productos } from "./listarProductos";
import { btnEliminar } from "@/components/btnEliminar";
import { btnEditar } from "@/components/btnEditar";
import { obtenerClaseColorCategoria } from "@/helpers/index.js";
import { del } from "@/utilidad/solicitudes";

const eliminarProducto = async (ruta) => {
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (confirmacion) {
    try {
      const resultado = await del(ruta);
      if (resultado.success) {
        alert("Producto eliminado exitosamente.");
        productosControlador(); // Recargar la lista de productos después de eliminar
      } else {
        alert("Error al eliminar el producto: " + resultado.message);
      }
    } catch (error) {
      alert("Error de red al eliminar el producto: " + error.message);
    }
  }
}

// Controlador que gestiona la carga y muestra de productos
export const productosControlador = async () => {
  // Buscamos el contenedor donde se insertará la lista en el DOM
  const editable = document.querySelector('div > div');
  
  // Obtenemos los productos desde la base de datos (servidor)
  const dataProductos = await get('productos');
  
  // Obtenemos las categorías desde la base de datos (servidor)
  const dataCategorias = await get('categorias');

  // Recorremos cada producto para asociarle los datos de su categoría
  const productosEnriquecidos = dataProductos.map(prod => {
    // Buscamos la categoría del producto en la lista de categorías
    const categoria = dataCategorias.find(c => String(c.id) === String(prod.categoriaId));
    
    return {
      ...prod, // Copiamos los datos existentes del producto
      // Le agregamos el nombre de la categoría encontrada (o un mensaje por defecto)
      nombreCategoria: categoria ? categoria.nombre : "Sin categoría",
      // Le agregamos la clase CSS de color que le corresponde
      claseBadge: obtenerClaseColorCategoria(prod.categoriaId)
    };
  });

  // Generamos el HTML usando la plantilla y lo insertamos en el contenedor
  editable.innerHTML = productos(productosEnriquecidos);

  // Buscamos todos los contenedores de botones de acción en las tarjetas renderizadas
  const contenedores = editable.querySelectorAll('.contenedor-acciones');
  

  // Recorremos cada contenedor para inyectarle sus botones de Editar y Eliminar
  contenedores.forEach(contenedor => {
    // Obtenemos el ID del producto guardado en el atributo data-id
    const id = contenedor.getAttribute('data-id');

    

    const editarBtn = btnEditar("productos", id);
    const eliminarBtn = btnEliminar("productos", id);
    contenedor.appendChild(editarBtn);
    contenedor.appendChild(eliminarBtn);

    editarBtn.addEventListener('click', () => {
      sessionStorage.setItem("editId", id);
      window.location.hash = "#/productos/editar";
    });

    eliminarBtn.addEventListener('click', async () => {
      sessionStorage.setItem("deleteId", id);
      window.location.hash = "#/productos/eliminar";
    });

    eliminarBtn.addEventListener('click', async (event) => {
      // Verificamos si el elemento clickeado es un botón de eliminar
      if (event.target.classList.contains('btn-eliminar')) {
        const id = event.target.getAttribute('data-id');
        // Confirmamos con el usuario si realmente desea eliminar el producto
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
          try {
            // Llamamos a la función de eliminación y esperamos su resultado  
            const resultado = await del(`productos/${id}`);
            if (resultado.success) {
              alert("Producto eliminado exitosamente.");
              // Recargamos la lista de productos para reflejar el cambio
              productosControlador();
            } else {
              alert("Error al eliminar el producto: " + resultado.message);
            }
          } catch (error) {
            alert("Error de red al eliminar el producto: " + error.message);
          }
        }
      }
    });
  });
}