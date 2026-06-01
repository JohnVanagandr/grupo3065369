// ANTES: No existía este archivo controlador de asignación en el proyecto.
// CAMBIO: Se creó para encapsular la carga de categorías, inyección del select en el DOM y la actualización del producto mediante eventos.
// POR QUÉ: Desacopla la lógica de asignación para que pueda ser importada y consumida fácilmente en el controlador final de la vista de edición de productos sin ensuciar otros archivos.

import { get } from "@/utilidad/solicitudes";
import { selectCategorias } from "@/components/selectCategorias";
import { actualizarCategoriaDelProducto } from "@/utilidad/serviciosAsignacion";

// Función del controlador para manejar la asignación de categorías
export const asignacionCategoriasControlador = async (productoId, selectedCategoriaId, contenedor) => {
  try {
    // Validamos que exista un contenedor del DOM donde meter el select
    if (!contenedor) {
      throw new Error("Se requiere un contenedor del DOM válido para inyectar el selector de categorías.");
    }
    // Validamos que tengamos el ID del producto
    if (!productoId) {
      throw new Error("Se requiere el ID del producto para configurar la asignación de categorías.");
    }

    // 1. Cargamos las categorías del servidor
    const categorias = await get("categorias");

    // 2. Creamos el selector <select> (elemento DOM) usando nuestro componente
    const select = selectCategorias(categorias, selectedCategoriaId);

    // 3. Limpiamos el contenedor (para no acumular elementos viejos) y le agregamos el select
    contenedor.innerHTML = "";
    contenedor.appendChild(select);

    // 4. Agregamos un evento para reaccionar cuando el usuario elija otra opción en el menú
    select.addEventListener("change", async (event) => {
      const nuevaCategoriaId = event.target.value; // Obtenemos el ID de la categoría seleccionada
      try {
        // Guardamos el cambio en el servidor enviando el ID del producto y la nueva categoría
        await actualizarCategoriaDelProducto(productoId, nuevaCategoriaId);
        console.log(`Categoría del producto ${productoId} actualizada exitosamente a ${nuevaCategoriaId}.`);
      } catch (err) {
        console.error("Error al actualizar la categoría del producto en el servidor:", err);
        // Si hay un error al guardar, le avisamos al usuario con un mensaje de alerta
        alert("Ocurrió un error al actualizar la categoría del producto. Por favor, intenta de nuevo.");
      }
    });

  } catch (error) {
    console.error("Error en asignacionCategoriasControlador:", error);
    throw error;
  }
};
