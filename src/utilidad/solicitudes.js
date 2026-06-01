export const get = async (ruta) => {
  const solicitud = await fetch(`${import.meta.env.VITE_API_URL}/${ruta}`);
  const data = await solicitud.json();
  return data
}

export const del = async (ruta) => {
  const solicitud = await fetch(`${import.meta.env.VITE_API_URL}/${ruta}`, {
    method: 'DELETE'
  }
);
if (!solicitud.ok) {
  throw new Error("Error en eliminar el recurso");
    return await solicitud.json();
  }
}