
export const categorias = (data) => {
  return data.map(({ id, nombre, descripcion }) => `
  <div class="categoria">  
  <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
      <button>Editar Categorias</button>
    </div>
    <Button>Editar Categoria</Button>

     <button
        class="btn-eliminar"
        data-id="${id}">
        Eliminar
      </button>
    </div>  
  `
  ).join(' '); // Para poder quitar las comas 
}


