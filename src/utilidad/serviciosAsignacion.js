import { url } from "../helpers/api/config";


export async function actualizarCategoriaDelProducto(productoId, nuevaCategoriaId) {
    try {
        const respuesta = await fetch(`${url}/productos/${productoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoriaId: Number(nuevaCategoriaId) // Nos aseguramos de que vaya como número
            })
        });

        // Si la API responde mal , disparamos un error
        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
        }

        // Si todo sale bien, retornamos los datos actualizados
        const datosActualizados = await respuesta.json();
        return datosActualizados;

    } catch (error) {
        console.error("Hubo un problema en el servicio:", error);
        // Volvemos a lanzar el error para que el controlador lo sepa y le avise al usuario
        throw error;
    }
}