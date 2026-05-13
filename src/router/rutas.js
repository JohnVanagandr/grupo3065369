import { categoriasControlador } from "../modulos/categorias/categoriasControlador.js";
import { categorias } from "../modulos/categorias/listarCategorias.js";
import { productos } from "../modulos/productos/listarProductos.js";
import { productosControlador } from "../modulos/productos/productosControlador.js";

export const rutas = [
  {
    'ruta': '#/productos',
    vista: productos,
    controlador: productosControlador
  },
  {
    'ruta': '#/categorias',
    vista: categorias,
    controlador: categoriasControlador
  }
];