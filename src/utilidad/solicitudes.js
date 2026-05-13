
export const get = async (ruta) => {
  const solicitud = await fetch(`http://localhost:3001/${ruta}`);
  const data = await solicitud.json();
  return data
}