const contenedor = document.querySelector("#aparecer");

export const vistaProducto = (producto) => {
    const div = document.createElement('div');
    container.className = "componente_crear";

    const button = document.createElement('button');
    button.className = "btn-crear";
    button.textContent = "Crear";
    container.appendChild(button);

    return container;
}
document.addEventListener("DOMContentLoaded", () => {
    const btnCrear = vistaProductos();
    
    console.log(btnCrear);

    contenedor.appendChild(btnCrear);

});