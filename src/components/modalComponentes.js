// Configuración de eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const botonCrear = document.getElementById("btn-crear");
    const modalOverlay = document.querySelector(".modal-overlay");
    const btnCerrarForm = document.getElementById("closeForm");
    const formulario = document.querySelector(".form");
    const btnGuardarForm = document.querySelector(".btn--guardar");
    const formTitulo = document.querySelector(".form__titulo");
    const labelNombre = document.getElementById("labelNombre");

    if (botonCrear) {   
        botonCrear.addEventListener("click", () => {
            formTitulo.textContent = "Crear nueva categoría";
            labelNombre.textContent = "Nombre de la categoría:";
            btnGuardarForm.textContent = "Guardar categoría";
            formulario.reset();
            modalOverlay.classList.remove("form__oculto");
        });
    }

    if (btnCerrarForm) {
        btnCerrarForm.addEventListener("click", () => {
            modalOverlay.classList.add("form__oculto");
        });
    }

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.classList.add("form__oculto");
        }
    });

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar la nueva categoría al servidor.
        modalOverlay.classList.add("form__oculto");
    });
});