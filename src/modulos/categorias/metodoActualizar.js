import { Post } from "../../helpers/index.js";

const actualizarproducto = async () => {
    // se obtiene el id del producto a actualizar
    const id = document.getelementbyid('id-producto').value;
    
    // se crea el objeto con los nuevos datos
    const datosactualizados = {
        nombre: document.getelementbyid('nombre').value,
        cantidad: document.getelementbyid('cantidad').value,
        categoria: document.getelementbyid('categoria').value
    };

    try {
        // realiza la conexion al servidor usando la url y el id
        const resultado = await post('categoria', id, datosactualizados);

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
