import { Put } from "../../helpers/index.js";

export const actualizarproducto = async () => {
    // se obtiene el id del producto a actualizar
    const id = document.querySelector('#id-producto').value;
    
    // se crea el objeto con los nuevos datos
    const datosactualizados = {
        nombre: document.querySelector('#nombre').value,
        cantidad: document.querySelector('#cantidad').value,
        categoria: document.querySelector('#categoria').value
    };

    try {
        // realiza la conexion al servidor usando la url y el id
        const resultado = await Put('categoria', id, datosactualizados);

        if (resultado) {
            // en caso de exito se muestra en consola
            console.log('registro actualizado con exito en el inventario');
            alert('producto actualizado correctamente');
        }
    } catch (error) {
        // se captura el error en caso de que falle la peticion
        console.error('error al ejecutar la update:', error);
    }
};
