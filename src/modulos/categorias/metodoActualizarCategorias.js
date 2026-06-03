import { Put } from "../../helpers/api/put.js";

export const actualizarCategoria = async () => {
    // se obtiene el id del producto a actualizar
    const id = document.querySelector('#id').value;
    
    // se crea el objeto con los nuevos datos
    const datosactualizados = {
        nombre: document.querySelector('#nombre').value,
        descripcion: document.querySelector('#desc').value,
    };

    try {
        // realiza la conexion al servidor usando la url y el id
        const resultado = await Put('categorias', id, datosactualizados);

        if (resultado) {
            // en caso de exito se muestra en consola
            console.log('registro actualizado con exito en el inventario');
            alert('categoria actualizada correctamente');
            window.location.href = "/#/categorias";
        }
    } catch (error) {
        // se captura el error en caso de que falle la peticion
        console.error('error al ejecutar la update:', error);
    }
};
