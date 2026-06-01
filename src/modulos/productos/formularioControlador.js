import { actualizarproducto } from "..";

export const formularioControladorProductos = () => {
  const id = sessionStorage.getItem("editId");

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
    console.log("Guardando producto...");
  });
};