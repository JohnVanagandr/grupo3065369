import { get } from "@/utilidad/solicitudes";
import { productos } from "./listarProductos";

export const productosControlador = async () => {
  const editable = document.querySelector('div > div');
  const data = await get('productos');

  editable.innerHTML = productos(data)

}