export const productos = (data) => {
  return data.map(({ nombre, descripcion, id }) =>
    `
    <div class="categoria-card">
      <div class="categoria-card__body">
    
        <div class="categoria-info">
          <h3 class="categoria-card__titulo">${nombre}</h3>
          <p class="categoria-card__desc">${descripcion}</p>
        </div>
    
        <div class="contenedor-acciones" data-id="${id}"></div>
    
      </div>
    </div>
    `
  ).join(' ');// Para quitar las comas
}