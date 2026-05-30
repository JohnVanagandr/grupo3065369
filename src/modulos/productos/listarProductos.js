export const productos = (data) => {
  return data.map(({ nombre, descripcion }) =>
    `
    <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
      <button>Editar productos</button>
    </div>
    <Button>Editar Producto</Button>

     <button
        class="btn-eliminar"
        data-id="${id}">
        Eliminar
      </button>
  `
  ).join(' ');// Para quitar las comas
}