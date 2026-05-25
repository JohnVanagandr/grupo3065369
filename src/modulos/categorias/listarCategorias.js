export const categorias = (data) => {
  return data.map(({ nombre, descripcion }) => `
    <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
    </div>
    <Button>Editar Categoria</Button>
  `
  ).join(' '); // Para poder quitar las comas 
}


