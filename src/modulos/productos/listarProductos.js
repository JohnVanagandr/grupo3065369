export const productos = (data) => {
  return data.map(({ nombre, descripcion }) =>
    `
    <article 
    style="background-color:var(--color-white); 
    margin: 0 auto;
    margin-top:20px;
    padding: 16px; 
    width: 50%;
    border-radius:8px">
      <div>
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
      </div>
      <button class="btn-editar" 
      style="background-color:var(--color-gray-400); 
      padding:10px;
      width: 100%;
      display: block;
      margin: 15px auto 0 auto;
      border-radius:8px;border: none;">Editar Producto</button>
    </article>
  `
  ).join(' ');// Para quitar las comas
}