import { createPost } from "../api/cliente.js";
import { listarTareas} from "./listar.js";

// Función para crear una nueva tarea
export const crearTarea = async () => {
    const boton = document.getElementById("btn-crear");

    // Verificamos que el título de la tarea no esté vacío
    if (!boton.value) return;

    // Llamamos a la función createPost para crear una nueva tarea en el servidor
    await createPost ({
        userId: 1,
        title: boton.value,
        body: "..."
    });

    // Limpiamos el campo de entrada y actualizamos la lista de tareas en la interfaz de usuario
    boton.value = "";
    listarTareas(); // Actualizamos la lista de tareas en la interfaz de usuario
}