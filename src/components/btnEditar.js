export const btnEditar = (id) => {
    const button = document.createElement("button");
    button.className = "categoria-card__btn categoria-card__btn--editar";
    button.textContent = "Editar";
    button.dataset.id = id;

    return button;
}
