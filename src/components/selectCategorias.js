// ANTES: No existía este componente select en el proyecto.
// CAMBIO: Se creó para generar y retornar un nodo HTMLSelectElement poblado con las categorías del sistema.
// POR QUÉ: Permite reutilizar la construcción del select mediante la API del DOM (document.createElement) y mantener consistencia con otros componentes DOM del proyecto.

// Función para crear el menú desplegable (select) de categorías
export const selectCategorias = (categorias = [], selectedId = null) => {
  // Creamos la etiqueta <select> en el DOM
  const select = document.createElement("select");
  // Le agregamos el atributo name (para identificar el campo al enviar)
  select.name = "categoriaId";
  // Le asignamos el id correspondiente
  select.id = "categoriaId";
  // Le agregamos las clases de estilos del formulario
  select.className = "form__input form__select";

  // Creamos la opción inicial (placeholder) que le dice al usuario qué hacer
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Seleccione una categoría";
  placeholder.disabled = true; // Desactivada para que no la vuelvan a elegir
  
  // Si no hay ninguna categoría previamente seleccionada, marcamos esta opción por defecto
  if (!selectedId) {
    placeholder.selected = true;
  }
  // Agregamos la opción inicial dentro de la etiqueta select
  select.appendChild(placeholder);

  // Recorremos cada categoría de la base de datos para crear sus opciones en el menú
  categorias.forEach(cat => {
    // Creamos la etiqueta <option>
    const option = document.createElement("option");
    // El valor que se enviará al servidor será el ID de la categoría
    option.value = cat.id;
    // El texto visible en la pantalla será el nombre de la categoría
    option.textContent = cat.nombre;
    
    // Si esta categoría coincide con la del producto que estamos editando, la seleccionamos por defecto
    if (String(cat.id) === String(selectedId)) {
      option.selected = true;
    }
    // Agregamos la opción al select
    select.appendChild(option);
  });

  // Retornamos el select del DOM listo para ser insertado
  return select;
};
