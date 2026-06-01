// ANTES: La importación de productos usaba ruta relativa "../modulos/productos"
// CAMBIO: Se cambió a usar el alias "@/modulos/productos"
// POR QUÉ: Para mantener consistencia con la importación de categorías que usa el alias @,
// y aprovechar la configuración del alias en vite.config.js para una mejor estructura
import { categoriasControlador, vistaCategorias } from "@/modulos/categorias/index.js";

import {
  vistaProductos,
  productosControlador
} from "@/modulos/productos";


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
