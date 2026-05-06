// evento para capturar clicks en "Editar"
contenedorTarjetas.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn--editar")) {
        const idProducto = e.target.dataset.id; 
        //Aquí se captura el id del producto desde el atributo data-id del botón.

        try {
            //Se hace una petición al servidor json-server 
            // para traer la información actual del producto que se quiere editar.
            const producto = await get('productos/${idProducto}');

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