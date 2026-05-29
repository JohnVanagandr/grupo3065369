import { EditManager } from '../../helpers/editManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const data = EditManager.getEditData();
    
    // Si hay datos, los inyectamos en el formulario
    if (data) {
        document.getElementById('id').value = data.id;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('desc').value = data.descripcion; // Asegúrate de que coincida con tu objeto
        document.getElementById('url').value = data.imagen;
        
        
        document.querySelector('.form__titulo').innerText = "EDITAR PRODUCTO";
    }

    
    document.getElementById('cancelForm').addEventListener('click', () => {
        EditManager.clearEditData();
        window.location.href = '/productos.html'; // O la ruta de tu listado
    });
});