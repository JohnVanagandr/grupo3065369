
export const get = async (ruta) => {
  const solicitud = await fetch(`http://10.0.103.249:3001/${ruta}`);
  const data = await solicitud.json();
  return data
}