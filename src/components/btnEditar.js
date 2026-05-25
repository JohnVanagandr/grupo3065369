const contenedor = document.querySelector("#aparecer");

export const vistaProducto = (producto) => {
    const div = document.createElement('div');
    container.className = "componente_editar";

    const button = document.createElement('button');
    button.className = "btn-editar";
    button.textContent = "Editar";
    container.appendChild(button);

    return container;
}

document.addEventListener("DOMContentLoaded", () => {
    const btnEditar = vistaProductos();
    
    console.log(btnEditar);

    contenedor.appendChild(btnEditar);

});