// import { get } from "./helpers/get.js";

import { enrrutador } from "./router/router.js";


const nav = document.querySelector("nav");
const editable = document.querySelector("#editable");

const arrancar = () => {
  enrrutador(editable)
  enrrutador()
}

window.addEventListener('hashchange', arrancar);

document.addEventListener('DOMContentLoaded', arrancar)


// async function cargarInventario() {

//   try {
//     const data = await get('productos');

//     if (!data) throw new Error("No se recibieron datos");

//     const productos = Array.isArray(data) ? data : (data.productos || []);

//     const htmlProductos = productos.map(producto => `
//             <article class="product-card">
//                 <img src="${producto.imagen}" alt="${producto.nombre}">
//                 <h3>${producto.nombre}</h3>
//                 <p>${producto.descripcion}</p>
//             </article>
//         `).join('');

//     cardContainer.innerHTML = htmlProductos || "<p>No hay productos disponibles.</p>";

//   } catch (error) {
//     console.error("Error al obtener los datos:", error);
//     cardContainer.innerHTML = `<p>Error al cargar el inventario, revisa que el servidor este encendido.</p>`;
//   }
// }

// document.addEventListener('DOMContentLoaded', cargarInventario);