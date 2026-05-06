// Importación de funciones desde módulos
import { Post } from "../helpers/posts.js";
import { get } from "../helpers/get.js"
//importamos la funcion de eliminar categorias

import { eliminarCategoria} from "../helpers/delete.js"
//Realizar importacion para crear las tarjetas
import { crearCategoriaCard } from "../components/tarjeta.js";

// Carga inicial de categorías al cargar la página
const ContTarjetas = document.querySelector("#card-container")

// Configuración de eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", async function(e){
    
    e.preventDefault();

    const datos = await get("categorias");
    
    datos.forEach(element => {

        const tarjeta = crearCategoriaCard(element);

        console.log(tarjeta);
        ContTarjetas.appendChild(tarjeta);
    });
    
    console.log("Se cargaron las cards");
})


//importamos la funcion de eliminar categorias
// import { log } from "console";
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
