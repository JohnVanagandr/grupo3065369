import { actualizarCategoria } from './metodoActualizarCategorias.js';
import { inicializarFormularioEdicion } from './editarCategoria.js'

export const formularioControladorCategoria = () => {


  const id = sessionStorage.getItem("editId");

  
  const inputId = document.getElementById("id");
  const btnCancel = document.getElementById("cancelForm");
  const form = document.querySelector("form");
  
  inicializarFormularioEdicion(id);
  
  if (!inputId || !btnCancel || !form) return;

  inputId.value = id;

  btnCancel.addEventListener("click", () => {
    window.location.hash = "#/categorias";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    actualizarCategoria();
    console.log("Guardando categoria...");
  });
};