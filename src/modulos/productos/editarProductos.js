import { EditManager } from '../../helpers/editManager.js';

export function inicializarFormularioEdicion() {
    const data = EditManager.getEditData();
    
    // Si hay datos, los inyectamos en el formulario
    if (data) {
        // Usamos un operador de encadenamiento opcional (?.) por seguridad, 
        // evitando errores si el elemento no existe en el DOM.
        const idInput = document.getElementById('id');
        const nombreInput = document.getElementById('nombre');
        const descInput = document.getElementById('desc');
        const urlInput = document.getElementById('url');
        const tituloForm = document.querySelector('.form__titulo');

        if (idInput) idInput.value = data.id;
        if (nombreInput) nombreInput.value = data.nombre;
        if (descInput) descInput.value = data.descripcion; // Coincide con tu objeto
        if (urlInput) urlInput.value = data.imagen;
        if (tituloForm) tituloForm.innerText = "EDITAR PRODUCTO";
    }

    // Configuración del botón cancelar
    const btnCancelar = document.getElementById('cancelForm');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamientos por defecto del botón/formulario
            EditManager.clearEditData();
            window.location.href = '/productos.html'; // O la ruta de tu listado
        });
    }
}