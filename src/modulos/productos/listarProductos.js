export const productos = (data) => {
  return data.map(({ nombre, descripcion }) =>
    `
    <div class="categoria-card">
      <div class="categoria-card__body">
    
        <div class="categoria-info">
          <h3 class="categoria-card__titulo">${nombre}</h3>
          <p class="categoria-card__desc">${descripcion}</p>
        </div>
    
        <button class="categoria-card__btn categoria-card__btn--editar">
          Editar Producto
        </button>
    
  </div>
</div>
  `
  ).join(' ');// Para quitar las comas
}