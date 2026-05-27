

export const get = async (ruta) => {
  const solicitud = await fetch(`http://192.168.1.10:3001/${ruta}`);
  const data = await solicitud.json();
  return data
}