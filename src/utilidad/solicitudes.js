export const get = async (ruta) => {
  const solicitud = await fetch(`${import.meta.env.VITE_API_URL}/${ruta}`);
  const data = await solicitud.json();
  return data
}