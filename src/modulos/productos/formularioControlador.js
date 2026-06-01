import { actualizarproducto } from "./metodoActualizarProductos.js";
import { inicializarFormularioEdicion } from "./editarProductos.js"

export const formularioControladorProductos = async() => {

  
  const id = sessionStorage.getItem("editId");
  const nombre = sessionStorage.getItem("")
  
  await inicializarFormularioEdicion(id);
  console.log(id);
  

  const inputId = document.getElementById("id");
  const btnCancel = document.getElementById("cancelForm");
  const form = document.querySelector("form");

  if (!inputId || !btnCancel || !form) return;

  inputId.value = id;

  btnCancel.addEventListener("click", () => {
    window.location.hash = "#/productos";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    actualizarproducto();
    console.log("Guardando producto...");
  });
};