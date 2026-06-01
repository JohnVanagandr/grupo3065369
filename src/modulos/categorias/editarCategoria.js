import { get } from '../../helpers/api/index.js';

export async function inicializarFormularioEdicion(id) {
    const data = await get(`categorias/${id}`);
    
    console.log(data);
    
    // Si hay datos, los inyectamos en el formulario
    if (data) {
        // Usamos un operador de encadenamiento opcional (?.) por seguridad, 
        // evitando errores si el elemento no existe en el DOM.
        const nombreInput = document.getElementById('nombre');
        const descInput = document.getElementById('desc');


        if (nombreInput) nombreInput.value = data.nombre;
        if (descInput) descInput.value = data.descripcion; // Coincide con tu objeto
    }

    // Configuración del botón cancelar
    const btnCancelar = document.getElementById('cancelForm');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamientos por defecto del botón/formulario
            EditManager.clearEditData();
            window.location.href = '/categorias.html'; // O la ruta de tu listado
        });
    }
}