// Importación de funciones desde módulos
import { crearTarea } from "./tareas/crear.js";

// Configuración de eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const botonCrear = document.getElementById("btn-crear");
    botonCrear.addEventListener("click", crearTarea);
});