
export const categorias = (data) => {
  return data.map(({ nombre, descripcion }) => `
    <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
      <button>Editar Categorias</button>
    </div>
  `
  ).join(' ');
}