import { get } from "../../utilidad/solicitudes";

export const productosControlador = async () => {
  const data = await get('productos');
  console.log(data);

  // const componente = productos(data)
}