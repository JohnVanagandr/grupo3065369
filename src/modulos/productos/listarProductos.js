export const productos = (data) => {
  return data.map(({ nombre, descripcion }) => {
    return `
    <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
    </div>
  `
  });
}