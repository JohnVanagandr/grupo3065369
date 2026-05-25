import { categoriasControlador, vistaCategorias } from "@/modulos/categorias/index.js";
import {
  vistaProductos,
  productosControlador
} from "../modulos/productos";

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
  {
    'ruta': '#/categorias',
    vista: vistaCategorias,
    controlador: categoriasControlador
  }
];