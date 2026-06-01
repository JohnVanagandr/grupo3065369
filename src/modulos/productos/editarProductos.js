import { get } from '../../helpers/api/index.js';
import { selectCategorias } from '../../components/selectCategorias.js';

export async function inicializarFormularioEdicion(id) {

    const data = await get(`productos/${id}`);
    const categorias = await get('categorias');

    console.log(data);
    
    // Si hay datos, los inyectamos en el formulario
    if (data) {
        // Usamos un operador de encadenamiento opcional (?.) por seguridad, 
        // evitando errores si el elemento no existe en el DOM.
        const nombreInput = document.getElementById('nombre');
        const descInput = document.getElementById('desc');
        const urlInput = document.getElementById('url');
        const tituloForm = document.querySelector('.form__titulo');
        const contenedorCategoria = document.getElementById('contenedorCategoria');

        if (nombreInput) nombreInput.value = data.nombre;
        if (descInput) descInput.value = data.descripcion; // Coincide con tu objeto
        if (urlInput) urlInput.value = data.imagen;
        if (tituloForm) tituloForm.innerText = "EDITAR PRODUCTO";
        
        if (contenedorCategoria) {
            // Limpiamos contenido previo por si acaso
            const label = contenedorCategoria.querySelector('label');
            contenedorCategoria.innerHTML = '';
            if (label) contenedorCategoria.appendChild(label);
            
            // Inyectamos el select con la categoría actual seleccionada
            contenedorCategoria.appendChild(selectCategorias(categorias, data.categoriaId));
        }
    }

    // Configuración del botón cancelar
    const btnCancelar = document.getElementById('cancelForm');
    const btnConfirm= document.getElementById("saveForm");
    if (btnCancelar) {
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamientos por defecto del botón/formulario
            window.location.hash = '#/productos'; // Redirección corregida al hash de la SPA
        });
    }
    if(btnConfirm){
        btnConfirm.addEventListener('click', (e) =>{
            e.preventDefault();
            EditManager.clearEditData();
            window.location.href = '/#/productos'; // O la ruta de tu listado
        })
    }
}