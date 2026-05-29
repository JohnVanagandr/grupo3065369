const contenedor = document.querySelector("#aparecer");

const vistaProductos = () => {
    // Constante de contenedor
    const container = document.createElement("div");
    container.className = "componente_eliminar";

    const button = document.createElement("button");

    // Boton de eliminar
    button.className = "btn-eliminar";
    button.textContent = "Eliminar";

    // Unir todos los items al contenedor
    container.appendChild(button);

    // retornar el contenedor
    return container;
}


document.addEventListener("DOMContentLoaded", () => {
    const btnEliminar = vistaProductos();
    
    console.log(btnEliminar);

    contenedor.appendChild(btnEliminar);

});
