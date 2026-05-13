import { get } from "../../utilidad/solicitudes";

export const categoriasControlador = async () => {
  const data = await get('categorias');
  console.log(data);

  // const componente = categorias(data)
}