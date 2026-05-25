export const vistaProductos = (producto) => {
    // Constante de contenedor
    const container = document.createElement("div");
    container.className = "componente_eliminar";

    const button = document.createElement("button");

    // Boton de eliminar
    button.className = "btn-eliminar";
    button.textContent = "Eliminar";

    // Unir todos los items al contenedor
    container = document.appendChild(button);

    // retornar el contenedor
    return container;
}
