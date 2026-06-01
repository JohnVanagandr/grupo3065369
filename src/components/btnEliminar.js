export const btnEliminar = (id) => {
    const button = document.createElement("button");
    button.className = "categoria-card__btn categoria-card__btn--eliminar";
    button.textContent = "Eliminar";
    button.dataset.id = id;

    return button;
}
