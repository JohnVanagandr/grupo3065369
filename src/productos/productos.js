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

// Función interna para despachar un nuevo producto al db.json
async function ejecutarCreacionProducto(datos) {
    try {
        const nuevoObjeto = {
            categoriaId: CATEGORIA_ACTUAL_ID,
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            imagen: datos.imagen
    };

    await Post("productos", nuevoObjeto);
    modalOverlay.classList.add("form__oculto");
    formulario.reset();
    
    // Recarga la interfaz sin refrescar el navegador (Petición de visual)
    await cargarYRenderizarPagina(); 
    } catch (error) {
    console.error("Error al crear el producto:", error);
    }
}

// Delegación de eventos para capturar clics en "Eliminar"
contenedorTarjetas.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn--eliminar")) {
        const idProducto = e.target.dataset.id;
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    
    if (confirmacion) {
        try {
        await remove(`productos/${idProducto}`);
        await cargarYRenderizarPagina(); // Re-renderizado limpio
        } catch (error) {
        console.error("Error al remover el recurso del servidor:", error);
        }
    }
    }
});

// evento para capturar clicks en "Editar"
contenedorTarjetas.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn--editar")) {
        const idProducto = e.target.dataset.id; 
        //Aquí se captura el id del producto desde el atributo data-id del botón.

        try {
            //Se hace una petición al servidor json-server 
            // para traer la información actual del producto que se quiere editar.
            const producto = await get(`productos/${idProducto}`);

            //Los campos del formulario se llenan con la información actual del producto.
            inputNombre.value = producto.nombre;
            inputDesc.value = producto.descripcion;
            inputUrl.value = producto.imagen;

            // Se cambia el título y el texto del botón para indicar que estamos en modo edición.
            formTitulo.textContent = "EDITAR DETALLES DEL PRODUCTO";
            btnGuardarForm.textContent = "Guardar cambios";
            
            // Guardar metadatos en el formulario para saber qué ID se está editando
            //es como poner un letrero en la hoja que diga "Estamos editando el producto"
            formulario.dataset.mode = "edit";
            formulario.dataset.id = idProducto;

            //Se abre la ventana emergente modal 
            // para que el usuario vea el formulario y pueda editar.
            //es como abrir la ficha del producto en un escritorio para trabajar sobre ella
            modalOverlay.classList.remove("form__oculto");

        } catch (error) {
            console.error("Error al preparar el flujo de edición:", error);
        }
    }
});

// Cuando el usuario da click en Guardar 
// se captura el evento y se evita que el navegador recargue la página. 
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Empaquetado de los campos del formulario
    //Se crea un objeto datosCampos con los valores de los inputs.
    //trim() elimina espacios al inicio y al final para evitar errores por espacios extra
    const datosCampos = {
        nombre: inputNombre.value.trim(),
        descripcion: inputDesc.value.trim(),
        imagen: inputUrl.value.trim()
    };

    //Aquí se consulta un atributo especial del formulario 
    // data-mode que indica si el formulario está en modo creación o modo edición.
    const modoFormulario = formulario.dataset.mode;

    if (modoFormulario === "create") {
        // Si el formulario está en modo crear se llama a la función de creación.
        await ejecutarCreacionProducto(datosCampos);
    } else if (modoFormulario === "edit") {
        // Si está en modo editar, se hace un PUT al servidor 
        // para actualizar el producto con los nuevos datos.
        const idProducto = formulario.dataset.id;
        try {
            // Usamos "Put" que ya viene importado desde la línea 1 del archivo
            await Put("productos", idProducto, {
                categoriaId: CATEGORIA_ACTUAL_ID,
                ...datosCampos
            });
            //Se cierra el modal se limpia el formulario y se vuelve a cargar 
            // la página para mostrar los cambios actualizados.
            modalOverlay.classList.add("form__oculto");
            formulario.reset();
            await cargarYRenderizarPagina();
        } catch (error) {
            console.error("Error al procesar la actualización del registro:", error);
        }
    }
});