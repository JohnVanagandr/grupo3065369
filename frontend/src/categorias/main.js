// Importación de funciones desde módulos
//importamos la funcion de eliminar categorias
import { eliminarCategoria } from '../helpers/delete.js';
import { cargarCategorias } from './tareas/actualizarInventario.js';


// Carga inicial de categorías al cargar la página
cargarCategorias();

// // Configuración de eventos al cargar el DOM
// document.addEventListener("DOMContentLoaded", () => {
//     const botonCrear = document.getElementById("btn-crear");
//     botonCrear.addEventListener("click",crearTarea);
// });

//seleccionamos el contenedor de las caeggorias y se guarda en uns cosnt llamada contendero
const contenedor = document.querySelector('.cards-lista');
//click para activar la eliminacion
contenedor.addEventListener('click', (e) => {
    //creamos el evento (e), si tiene en su lista de clases (.classlist) la clase de eliminar (.categoria-card__btn--eliminar), entonces se activa el proceso de eliminacion
    if (e.target.classList.contains('categoria-card__btn--eliminar')){
        //buscamos la tarjeta y el ID y lo almacenamos en dos constantes por separadas, que recieben de nombre tarjeta y idTexto
        console.log('click detectado en el contendor');
        const tarjeta = e.target.closest('.categoria-card');
        const idTexto = tarjeta.querySelector('.categoria-card__id').textContent;
        //limpiamsos el ID, (quitandole el # y espacios en blancos)
        // se al macena en una const que recibe por nombre id.
        const id = idTexto.replace('#', '').trim();
        //llaamamos a la funcion eliminarCategoria
        eliminarCategoria(id, tarjeta);

    }

});
