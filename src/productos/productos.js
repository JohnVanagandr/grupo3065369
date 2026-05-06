// //importaciones globales
// import { get, Post, remove, Put } from "../helpers/index.js";

// // captura de elementos del DOM de productos.html
// const contenedorTitulo = document.querySelector(".contenedor__titulo");
// const contenedorContexto = document.querySelector(".contenedor__contexto");
// const contenedorTarjetas = document.querySelector(".contenedor__tarjetas");
// const modalOverlay = document.querySelector(".modal-overlay");
// const formulario = document.querySelector(".form");
// const formTitulo = document.querySelector(".form__titulo");
// const btnAbrirCrear = document.querySelector(".contenedor__button--crear");
// const btnCerrarForm = document.getElementById("closeForm");
// const btnGuardarForm = document.querySelector(".btn--guardar");

// // inputs del formulario
// const inputNombre = document.getElementById("nombre");
// const inputDesc = document.getElementById("desc");
// const inputUrl = document.getElementById("url");    

// // obtener el ID de la categoría desde la URL de forma dinámica
// const parametrosURL = new URLSearchParams(window.location.search);
// const CATEGORIA_ACTUAL_ID = Number(parametrosURL.get("categoriaId")) || 1; 

// // función principal para pintar la pantalla de forma dinámica
// async function cargarYRenderizarPagina() {
//     try {
//         // traer la categoría actual para cambiar textos de la vista
//         const categorias = await get("categorias");
//         const categoriaInfo = categorias.find(c => c.id === CATEGORIA_ACTUAL_ID);
    
//         if (categoriaInfo) {
//             contenedorTitulo.textContent = `PRODUCTOS-${categoriaInfo.nombre.toUpperCase()}`;
//             contenedorContexto.textContent = categoriaInfo.descripcion;
//         }

//         // traer y filtrar productos de la base de datos
//         const todosLosProductos = await get("productos");
//         const productosFiltrados = todosLosProductos.filter(p => p.categoriaId === CATEGORIA_ACTUAL_ID);

//         // limpiar tarjetas viejas (excepto el botón de crear)
//         const tarjetasViejas = contenedorTarjetas.querySelectorAll(".contenedor__tarjeta");
//         tarjetasViejas.forEach(t => t.remove());

//         // inyectar las nuevas tarjetas dinámicamente antes del botón crear
//         productosFiltrados.forEach(producto => {
//             const tarjetaHTML = document.createElement("div");
//             tarjetaHTML.classList.add("contenedor__tarjeta");
            
//             // 🔥 CAMBIO CRÍTICO: Se añade type="button" explícito a los botones dinámicos
//             tarjetaHTML.innerHTML = `
//             <div class="contenedor__imagen" style="background-image: url('${producto.imagen}')"></div>
//             <div class="contenedor__informacion">
//                 <div class="contenedor__header">
//                     <h3 class="contenedor__producto">${producto.nombre}</h3>
//                     <span class="contenedor__id">#${producto.id}</span>
//                 </div>
//                 <p class="contenedor__descripcion">${producto.descripcion}</p>
//                 <div class="contenedor__acciones">
//                     <button type="button" class="btn btn--editar" data-id="${producto.id}">Editar Producto</button>
//                     <button type="button" class="btn btn--eliminar" data-id="${producto.id}">Eliminar Producto</button>
//                 </div>
//             </div>
//             `;
//             // insertar antes del botón "Crear producto" para no alterar el flujo visual
//             contenedorTarjetas.insertBefore(tarjetaHTML, btnAbrirCrear);
//         });

//     } catch (error) {
//         console.error("Error al estructurar o renderizar la interfaz:", error);
//     }
// }

// // inicialización automática al cargar el documento
// document.addEventListener("DOMContentLoaded", cargarYRenderizarPagina);

// // control básico de apertura/cierre del modal
// btnAbrirCrear.addEventListener("click", () => {
//   // configuración por defecto para creación
//     formulario.dataset.mode = "create";
//     formulario.dataset.id = "";
//     formTitulo.textContent = "INFORMACIÓN DEL PRODUCTO";
//     btnGuardarForm.textContent = "Crear producto";
//     formulario.reset();
    
//     modalOverlay.classList.remove("form__oculto");
// });

// btnCerrarForm.addEventListener("click", () => {
//     modalOverlay.classList.add("form__oculto");
// });

// // codigo seguno integrante (santiago)

// // Función interna para despachar un nuevo producto al db.json
// async function ejecutarCreacionProducto(datos) {
//     try {
//         const nuevoObjeto = {
//             categoriaId: CATEGORIA_ACTUAL_ID,
//             nombre: datos.nombre,
//             descripcion: datos.descripcion,
//             imagen: datos.imagen
//         };

//         await Post("productos", nuevoObjeto);
//         modalOverlay.classList.add("form__oculto");
//         formulario.reset();
        
//         // Recarga la interfaz sin refrescar el navegador (Petición de visual)
//         await cargarYRenderizarPagina(); 
//     } catch (error) {
//         console.error("Error al crear el producto:", error);
//     }
// }

// // Delegación de eventos para capturar clics en "Eliminar"
// contenedorTarjetas.addEventListener("click", async (e) => {
//     if (e.target.classList.contains("btn--eliminar")) {
//         e.preventDefault();
        
//         const idProducto = e.target.dataset.id;
//         const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    
//         if (confirmacion) {
//             try {
//                 await remove(`productos/${idProducto}`);
//                 await cargarYRenderizarPagina(); // Re-renderizado limpio en caliente
//             } catch (error) {
//                 console.error("Error al remover el recurso del servidor:", error);
//             }
//         }
//     }
// });

// // delegación de eventos para capturar clics en "Editar"
// contenedorTarjetas.addEventListener("click", async (e) => {
//     if (e.target.classList.contains("btn--editar")) {
//         e.preventDefault(); // Aseguramos el freno también al editar
//         const idProducto = e.target.dataset.id;

//         try {
//             // Conseguir los datos actuales del producto desde el servidor
//             const producto = await get(`productos/${idProducto}`);

//             // 1. Rellenar los inputs con los valores existentes
//             inputNombre.value = producto.nombre;
//             inputDesc.value = producto.descripcion;
//             inputUrl.value = producto.imagen;

//             // 2. Mutar visualmente el formulario (Cambio de textos informativos)
//             formTitulo.textContent = "EDITAR DETALLES DEL PRODUCTO";
//             btnGuardarForm.textContent = "Guardar cambios";

//             // 3. Guardar metadatos en el formulario para saber qué ID se está editando
//             formulario.dataset.mode = "edit";
//             formulario.dataset.id = idProducto;

//             // 4. Mostrar el modal
//             modalOverlay.classList.remove("form__oculto");

//         } catch (error) {
//             console.error("Error al preparar el flujo de edición:", error);
//         }
//     }
// });

// // MANEJADOR UNIFICADO DEL EVENTO SUBMIT (Conecta el trabajo de Integrante 2 y 3)
// formulario.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     // Empaquetado de los campos del formulario
//     const datosCampos = {
//         nombre: inputNombre.value.trim(),
//         descripcion: inputDesc.value.trim(),
//         imagen: inputUrl.value.trim()
//     };

//     const modoFormulario = formulario.dataset.mode;

//     if (modoFormulario === "create") {
//         // Ejecuta la lógica del Integrante 2
//         await ejecutarCreacionProducto(datosCampos);
//     } else if (modoFormulario === "edit") {
//         // El Integrante 3 maneja la actualización directamente con la función Put limpia
//         const idProducto = formulario.dataset.id;
//         try {
//             await Put("productos", idProducto, {
//                 categoriaId: CATEGORIA_ACTUAL_ID,
//                 ...datosCampos
//             });

//             modalOverlay.classList.add("form__oculto");
//             formulario.reset();
//             await cargarYRenderizarPagina(); 
//         } catch (error) {
//             console.error("Error al procesar la actualización del registro:", error);
//         }
//     }
// });

import { get, Post, remove, Put } from "../helpers/index.js";

// Captura de elementos del DOM
const contenedorTitulo = document.querySelector(".contenedor__titulo");
const contenedorContexto = document.querySelector(".contenedor__contexto");
const contenedorTarjetas = document.querySelector(".contenedor__tarjetas");
const modalOverlay = document.querySelector(".modal-overlay");
const formulario = document.querySelector(".form");
const formTitulo = document.querySelector(".form__titulo");
const labelNombre = document.getElementById("labelNombre");
const btnAbrirCrear = document.querySelector(".contenedor__button--crear");
const btnCerrarForm = document.getElementById("closeForm");
const btnGuardarForm = document.querySelector(".btn--guardar");

// Campos del formulario
const inputNombre = document.getElementById("nombre");
const inputDesc = document.getElementById("desc");
const inputUrl = document.getElementById("url");    

// Capturamos el ID de la categoría desde la URL. Si no hay, por defecto usa la "1"
const parametrosURL = new URLSearchParams(window.location.search);
const CATEGORIA_ACTUAL_ID = parametrosURL.get("categoriaId") || "1"; 

// Renderizado dinámico de la página
async function cargarYRenderizarPagina() {
    try {
        // Buscamos la info de la categoría actual para actualizar los encabezados
        const categorias = await get("categorias");
        const categoriaInfo = categorias.find(c => String(c.id) === String(CATEGORIA_ACTUAL_ID));
    
        if (categoriaInfo) {
            const nombreMayuscula = categoriaInfo.nombre.toUpperCase();
            contenedorTitulo.textContent = `PRODUCTOS-${nombreMayuscula}`;
            document.title = `Productos - ${categoriaInfo.nombre}`;
            contenedorContexto.textContent = categoriaInfo.descripcion;
        }

        // Traemos los productos y filtramos asegurando que coincidan los IDs como texto
        const todosLosProductos = await get("productos");
        const productosFiltrados = todosLosProductos.filter(p => String(p.categoriaId) === String(CATEGORIA_ACTUAL_ID));

        // Limpiamos las tarjetas anteriores para evitar duplicados en pantalla
        const tarjetasViejas = contenedorTarjetas.querySelectorAll(".contenedor__tarjeta");
        tarjetasViejas.forEach(t => t.remove());

        // Inyectamos las tarjetas de los productos que corresponden a esta categoría
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
                        <button type="button" class="btn btn--editar" data-id="${producto.id}">Editar Producto</button>
                        <button type="button" class="btn btn--eliminar" data-id="${producto.id}">Eliminar Producto</button>
                    </div>
                </div>
            `;
            // Se inserta justo antes del botón de crear para mantener el diseño limpio
            contenedorTarjetas.insertBefore(tarjetaHTML, btnAbrirCrear);
        });

    } catch (error) {
        console.error("Error al cargar los datos en la interfaz:", error);
    }
}

// Carga inicial al abrir el documento
document.addEventListener("DOMContentLoaded", cargarYRenderizarPagina);

// Configuración del formulario en modo CREAR
btnAbrirCrear.addEventListener("click", () => {
    formulario.dataset.mode = "create";
    formulario.dataset.id = "";
    formTitulo.textContent = "REGISTRAR NUEVO PRODUCTO";
    labelNombre.textContent = "Nombre del nuevo producto:";
    btnGuardarForm.textContent = "Crear producto";
    formulario.reset();
    
    modalOverlay.classList.remove("form__oculto");
});

// Cierre del modal
btnCerrarForm.addEventListener("click", () => {
    modalOverlay.classList.add("form__oculto");
});

// Función interna para añadir productos al backend
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
        
        // Actualizamos la lista en caliente sin recargar la página entera
        await cargarYRenderizarPagina(); 
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
}

// Manejo del click en el botón de eliminar
contenedorTarjetas.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn--eliminar")) {
        e.preventDefault();
        
        const idProducto = e.target.dataset.id;
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    
        if (confirmacion) {
            try {
                await remove(`productos/${idProducto}`);
                await cargarYRenderizarPagina(); 
            } catch (error) {
                console.error("Error al eliminar el producto del servidor:", error);
            }
        }
    }
});

// Manejo del click en el botón de editar (Rellena el formulario y cambia textos)
contenedorTarjetas.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn--editar")) {
        e.preventDefault();
        const idProducto = e.target.dataset.id;

        try {
            const producto = await get(`productos/${idProducto}`);

            inputNombre.value = producto.nombre;
            inputDesc.value = producto.descripcion;
            inputUrl.value = producto.imagen;

            // Ajustamos las etiquetas dinámicamente para el modo edición
            formTitulo.textContent = "MODIFICAR DETALLES DEL PRODUCTO";
            labelNombre.textContent = "Modificar nombre del producto:";
            btnGuardarForm.textContent = "Guardar cambios";

            formulario.dataset.mode = "edit";
            formulario.dataset.id = idProducto;

            modalOverlay.classList.remove("form__oculto");

        } catch (error) {
            console.error("Error al preparar los datos para edición:", error);
        }
    }
});

// Procesamiento unificado del formulario (Guardar o Editar)
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datosCampos = {
        nombre: inputNombre.value.trim(),
        descripcion: inputDesc.value.trim(),
        imagen: inputUrl.value.trim()
    };

    const modoFormulario = formulario.dataset.mode;

    if (modoFormulario === "create") {
        await ejecutarCreacionProducto(datosCampos);
    } else if (modoFormulario === "edit") {
        const idProducto = formulario.dataset.id;
        try {
            await Put("productos", idProducto, {
                categoriaId: CATEGORIA_ACTUAL_ID,
                ...datosCampos
            });

            modalOverlay.classList.add("form__oculto");
            formulario.reset();
            await cargarYRenderizarPagina(); 
        } catch (error) {
            console.error("Error al intentar actualizar el registro:", error);
        }
    }
});