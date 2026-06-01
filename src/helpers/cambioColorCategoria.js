// ANTES: No existía este helper en el proyecto.
// CAMBIO: Se creó para retornar la clase CSS correspondiente según el ID de categoría con condicionales directos sin variables innecesarias.
// POR QUÉ: Evita la duplicación de condicionales de estilos de color en las vistas y centraliza la lógica de coloración en un único helper reutilizable.

// Esta función recibe el ID de la categoría y devuelve la clase CSS de color correspondiente
export const obtenerClaseColorCategoria = (categoriaId) => {
  // Si la categoría es 1 (inmobiliario), devolvemos la clase para pintar el badge de naranja
  if (categoriaId == 1) return "categoria-badge--inmobiliario";
  
  // Si la categoría es 2 (tecnologia), devolvemos la clase para pintar el badge de morado
  if (categoriaId == 2) return "categoria-badge--tecnologia";
  
  // Si la categoría es 3 (refrigeracion), devolvemos la clase para pintar el badge de verde
  if (categoriaId == 3) return "categoria-badge--refrigeracion";
  
  // Si no coincide con ninguna, devolvemos una clase gris por defecto
  return "categoria-badge--default";
};
