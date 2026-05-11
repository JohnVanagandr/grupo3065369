
import { get, Post, remove, Put,loadComponents,validateForm,clearError } from "../helpers/index.js";

async function init(){

    await loadComponents("formulario", "../components/formulario.html");
    
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
    const errorNombre = document.getElementById("errorNombre");
    const errorDesc = document.getElementById("errorDesc");
    const errorUrl = document.getElementById("errorUrl");
    
    // Campos del formulario
    const inputNombre = document.getElementById("nombre");
    const inputDesc = document.getElementById("desc");
    const inputUrl = document.getElementById("url");    
    
    // Capturamos el ID de la categoría desde la URL. Si no hay, por defecto usa la "1"
    const parametrosURL = new URLSearchParams(window.location.search);
    const CATEGORIA_ACTUAL_ID = parametrosURL.get("categoriaId") || "1"; 
    
    function handleInputError(inputElement, errorElement) {

        inputElement.addEventListener("input", () => {

            if (inputElement.value.trim().length > 0) {

                clearError(errorElement, inputElement);

            }

        });
    }
    handleInputError(inputNombre, errorNombre);
    handleInputError(inputDesc, errorDesc);
    handleInputError(inputUrl, errorUrl);

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

                // Tarjeta principal
                const tarjetaHTML = document.createElement("div");
                tarjetaHTML.classList.add("contenedor__tarjeta");

                // Imagen
                const imagenProducto = document.createElement("img");
                imagenProducto.src = producto.imagen;
                imagenProducto.alt = producto.nombre;
                imagenProducto.classList.add("contenedor__imagen");

                // Contenedor información
                const contenedorInformacion = document.createElement("div");
                contenedorInformacion.classList.add("contenedor__informacion");

                // Header
                const contenedorHeader = document.createElement("div");
                contenedorHeader.classList.add("contenedor__header");

                // Nombre producto
                const nombreProducto = document.createElement("h3");
                nombreProducto.classList.add("contenedor__producto");
                nombreProducto.textContent = producto.nombre;

                // ID producto
                const idProducto = document.createElement("span");
                idProducto.classList.add("contenedor__id");
                idProducto.textContent = `#${producto.id}`;

                // Descripción
                const descripcionProducto = document.createElement("p");
                descripcionProducto.classList.add("contenedor__descripcion");
                descripcionProducto.textContent = producto.descripcion;

                // Acciones
                const contenedorAcciones = document.createElement("div");
                contenedorAcciones.classList.add("contenedor__acciones");

                // Botón editar
                const btnEditar = document.createElement("button");
                btnEditar.type = "button";
                btnEditar.classList.add("btn", "btn--editar");
                btnEditar.dataset.id = producto.id;
                btnEditar.textContent = "Editar Producto";

                // Botón eliminar
                const btnEliminar = document.createElement("button");
                btnEliminar.type = "button";
                btnEliminar.classList.add("btn", "btn--eliminar");
                btnEliminar.dataset.id = producto.id;
                btnEliminar.textContent = "Eliminar Producto";

                // Armado del DOM
                contenedorHeader.appendChild(nombreProducto);
                contenedorHeader.appendChild(idProducto);

                contenedorAcciones.appendChild(btnEditar);
                contenedorAcciones.appendChild(btnEliminar);

                contenedorInformacion.appendChild(contenedorHeader);
                contenedorInformacion.appendChild(descripcionProducto);
                contenedorInformacion.appendChild(contenedorAcciones);

                tarjetaHTML.appendChild(imagenProducto);
                tarjetaHTML.appendChild(contenedorInformacion);

                // Insertar antes del botón crear
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
    
        const formularioValido = validateForm(formulario, {

            nombre: {
                required: true,
                message: "El nombre es obligatorio",
                errorId: "errorNombre"
            },

            desc: {
                required: true,
                message: "La descripción no puede estar vacía",
                errorId: "errorDesc"
            },

            url: {
                required: true,
                type: "url",
                message: "Debes poner un enlace de imagen",
                errorId: "errorUrl"
            }
        });

        if (!formularioValido) return;
    
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
    await cargarYRenderizarPagina();

}

init();