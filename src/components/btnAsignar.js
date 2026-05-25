const contenedor = document.querySelector("#aparecer");

export const vistaProducto = (producto) => {
    const div = document.createElement('div');
    container.className = "componente_asignar";

    const button = document.createElement('button');
    button.className = "btn-asignar";
    button.textContent = "Asignar";
    container.appendChild(button);

    return container;
}
document.addEventListener("DOMContentLoaded", () => {
    const btnAsignar = vistaProductos();
    
    console.log(btnAsignar);

    contenedor.appendChild(btnAsignar);

});