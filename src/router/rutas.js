import { categoriasControlador, vistaCategorias } from "@/modulos/categorias/index.js";
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
    vista: vistaCategorias,
    controlador: categoriasControlador
  },
  // Ruta para la edicion de la categoria
  {
    'ruta': '#/categorias/editar',
    vista: vistaCategorias,
    controlador: categoriasControlador
  } 
]