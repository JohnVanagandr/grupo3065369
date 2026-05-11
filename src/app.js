// import { get } from "./helpers/get.js";
import { productos } from "./modulos/productos/listarProductos.js";
import { get } from "./utilidad/solicitudes.js";


const cardContainer = document.getElementById('card-container');
const listar_productos = document.querySelector("#listarProductos");
const listar_categorias = document.querySelector("#listarCategorias");
const editable = document.querySelector("#editable");


const armarProductos = async () => {
  const data = await get('productos');
  const componente = productos(data)
  editable.innerHTML = componente
}
const armarCategorias = async () => {
  const data = await get('categorias');
  const componente = productos(data)
  editable.innerHTML = componente
}


listar_productos.addEventListener('click', (e) => {
  e.preventDefault();
  armarProductos();
})
listar_categorias.addEventListener('click', (e) => {
  e.preventDefault();
  armarCategorias();
})

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