export const productos = (data) => {
  return data.map(({ nombre, descripcion }) =>
    `
    <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
    </div>
  `
  ).join(' ');
}