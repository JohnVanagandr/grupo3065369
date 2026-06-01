// ANTES: La función de plantilla solo desestructuraba nombre, descripcion e id.
// CAMBIO: Se agregaron nombreCategoria y claseBadge a la desestructuración, y se inyectó la etiqueta span de la categoría en el HTML generado.
// POR QUÉ: Permite renderizar visualmente el badge de la categoría asociada con sus colores respectivos manteniendo la vista como una plantilla pura de texto.

// Esta función recibe los productos y devuelve el código HTML de cada tarjeta en texto plano
export const productos = (data) => {
  // Recorremos cada producto del array usando map
  return data.map(({ nombre, descripcion, id, nombreCategoria, claseBadge }) =>
    `
    <div class="categoria-card">
      <div class="categoria-card__body">
    
        <div class="categoria-info">
          <!-- Cabecera de la tarjeta: Título del producto y Badge con el nombre y color de la categoría -->
          <div class="categoria-card__header">
            <h3 class="categoria-card__titulo">${nombre}</h3>
            <span class="categoria-badge ${claseBadge}">${nombreCategoria}</span>
          </div>
          <!-- Descripción del producto -->
          <p class="categoria-card__desc">${descripcion}</p>
        </div>
    
        <!-- Contenedor donde se insertarán los botones de editar y eliminar -->
        <div class="contenedor-acciones" data-id="${id}"></div>
    
      </div>
    </div>

    `
  ).join(''); // Unimos todas las tarjetas en un solo texto eliminando las comas del array
}