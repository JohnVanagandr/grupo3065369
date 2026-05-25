export const categorias = (data) => {
  return data.map(({ nombre, descripcion, id}) => `
    <div>
      <h2>${nombre}</h2>
      <p>${descripcion}</p>
    </div>
    <Button>Editar Categoria</Button>
    <!-- boton eliminar -->
    <div class="componente_eliminar">
      <Button class="btn-eliminar" data-id=${id}>Eliminar</Button>
    </div>
  `
  ).join(' '); // Para poder quitar las comas 
}


