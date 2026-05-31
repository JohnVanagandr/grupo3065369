<<<<<<< HEAD
import { vistaCategoria} from "../modulos/categorias/vistaCategoria.js";
import { categoriasControlador } from "../modulos/categorias/categoriasControlador.js"

=======
import { categoriasControlador, vistaCategorias } from "@/modulos/categorias/index.js";
>>>>>>> a57d1e2e6adb9c1fbe62d216d074c161f6d69308
import {
  vistaProductos,
  productosControlador
} from "../modulos/productos";


// Estas serian las rutas
export const rutas = [
  {
    'ruta': '#/productos',
    vista: vistaProductos,
    controlador: productosControlador
  },
  {
    'ruta': '#/productos/editar',
    vista: vistaProductos,
    controlador: productosControlador
  },
  
  // Esta es la ruta de categorias
  {
    'ruta': '#/categorias',
<<<<<<< HEAD
    vista: vistaCategoria,
=======
    vista: vistaCategorias,
>>>>>>> a57d1e2e6adb9c1fbe62d216d074c161f6d69308
    controlador: categoriasControlador
  },
  // Ruta para la edicion de la categoria
  {
    'ruta': '#/categorias/editar',
    vista: vistaCategorias,
    controlador: categoriasControlador
  } 
]
