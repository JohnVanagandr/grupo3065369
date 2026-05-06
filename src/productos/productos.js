//importaciones globales
import { get, Post, remove, Put } from "../helpers/index.js";

// captura de elementos del DOM de productos.html
const contenedorTitulo = document.querySelector(".contenedor__titulo");
const contenedorContexto = document.querySelector(".contenedor__contexto");
const contenedorTarjetas = document.querySelector(".contenedor__tarjetas");
const modalOverlay = document.querySelector(".modal-overlay");
const formulario = document.querySelector(".form");
const formTitulo = document.querySelector(".form__titulo");
const btnAbrirCrear = document.querySelector(".contenedor__button--crear");
const btnCerrarForm = document.getElementById("closeForm");
const btnGuardarForm = document.querySelector(".btn--guardar");

// inputs del formulario
const inputNombre = document.getElementById("nombre");
const inputDesc = document.getElementById("desc");
const inputUrl = document.getElementById("url");    

// obtener el ID de la categoría desde la URL de forma dinámica

const parametrosURL = new URLSearchParams(window.location.search);
const CATEGORIA_ACTUAL_ID = Number(parametrosURL.get("categoriaId")) || 1; 

// función principal para pintar la pantalla de forma dinámica
async function cargarYRenderizarPagina() {
    try {
    // traer la categoría actual para cambiar textos de la vista
        const categorias = await get("categorias");
        const categoriaInfo = categorias.find(c => c.id === CATEGORIA_ACTUAL_ID);
    
        if (categoriaInfo) {
            contenedorTitulo.textContent = `PRODUCTOS-${categoriaInfo.nombre.toUpperCase()}`;
            contenedorContexto.textContent = categoriaInfo.descripcion;
        }

        // traer y filtrar productos de la base de datos
        const todosLosProductos = await get("productos");
        const productosFiltrados = todosLosProductos.filter(p => p.categoriaId === CATEGORIA_ACTUAL_ID);

        // limpiar tarjetas viejas (excepto el botón de crear)
        const tarjetasViejas = contenedorTarjetas.querySelectorAll(".contenedor__tarjeta");
        tarjetasViejas.forEach(t => t.remove());

        // inyectar las nuevas tarjetas dinámicamente antes del botón crear
        productosFiltrados.forEach(producto => {
            const tarjetaHTML = document.createElement("div");
            tarjetaHTML.classList.add("contenedor__tarjeta");
            tarjetaHTML.innerHTML = `
            <div class="contenedor__imagen" style="background-image: url('${producto.imagen}')"></div>
            <div class="contenedor__informacion">
                <div class="contenedor__header">
                    <h3 class="contenedor__producto">${producto.nombre}</h3>
                    <span class="contenedor__id">#${producto.id}</span>
                </div>
                <p class="contenedor__descripcion">${producto.descripcion}</p>
                <div class="contenedor__acciones">
                    <button class="btn btn--editar" data-id="${producto.id}">Editar Producto</button>
                    <button class="btn btn--eliminar" data-id="${producto.id}">Eliminar Producto</button>
                </div>
            </div>
            `;
          // insertar antes del botón "Crear producto" para no alterar el flujo visual
            contenedorTarjetas.insertBefore(tarjetaHTML, btnAbrirCrear);
    });

    } catch (error) {
    console.error("Error al estructurar o renderizar la interfaz:", error);
    }
}

// inicialización automática al cargar el documento
document.addEventListener("DOMContentLoaded", cargarYRenderizarPagina);

// control básico de apertura/cierre del modal
btnAbrirCrear.addEventListener("click", () => {
  // configuración por defecto para creación
    formulario.dataset.mode = "create";
    formulario.dataset.id = "";
    formTitulo.textContent = "INFORMACIÓN DEL PRODUCTO";
    btnGuardarForm.textContent = "Crear producto";
    formulario.reset();
    
    modalOverlay.classList.remove("form__oculto");
});

btnCerrarForm.addEventListener("click", () => {
    modalOverlay.classList.add("form__oculto");
});

// codigo seguno integrante (santiago)