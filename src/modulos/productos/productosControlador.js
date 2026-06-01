// ANTES: Solo se obtenían los productos de la API y se renderizaban directamente.
// CAMBIO: Se añadió la obtención secuencial de categorías y el enriquecimiento de datos de los productos con su categoría y clase de color.
// POR QUÉ: Permite separar la lógica de negocio y de mapeo de datos de la plantilla pura en listarProductos.js.

import { get } from "@/utilidad/solicitudes";
import { productos } from "./listarProductos";
import { btnEliminar } from "@/components/btnEliminar";
import { btnEditar } from "@/components/btnEditar";
import { obtenerClaseColorCategoria } from "@/helpers/index.js";
import { del } from "@/utilidad/solicitudes";

const eliminarProducto = async (id) => {
    return await del(`productos/${id}`);
};

// Controlador que gestiona la carga y muestra de productos
export const productosControlador = async () => {
    // Buscamos el contenedor donde se insertará la lista en el DOM
    const editable = document.querySelector("div > div");

    // Obtenemos los productos desde la base de datos (servidor)
    const dataProductos = await get("productos");

    // Obtenemos las categorías desde la base de datos (servidor)
    const dataCategorias = await get("categorias");

    // Recorremos cada producto para asociarle los datos de su categoría
    const productosEnriquecidos = dataProductos.map((prod) => {
        // Buscamos la categoría del producto en la lista de categorías
        const categoria = dataCategorias.find(
            (c) => String(c.id) === String(prod.categoriaId),
        );

        return {
            ...prod, // Copiamos los datos existentes del producto
            // Le agregamos el nombre de la categoría encontrada (o un mensaje por defecto)
            nombreCategoria: categoria ? categoria.nombre : "Sin categoría",
            // Le agregamos la clase CSS de color que le corresponde
            claseBadge: obtenerClaseColorCategoria(prod.categoriaId),
        };
    });

    // Generamos el HTML usando la plantilla y lo insertamos en el contenedor
    editable.innerHTML = productos(productosEnriquecidos);

    // Buscamos todos los contenedores de botones de acción en las tarjetas renderizadas
    const contenedores = editable.querySelectorAll(".contenedor-acciones");

    // Recorremos cada contenedor para inyectarle sus botones de Editar y Eliminar
    contenedores.forEach((contenedor) => {
        // Obtenemos el ID del producto guardado en el atributo data-id
        const id = contenedor.getAttribute("data-id");

        const editarBtn = btnEditar("productos", id);
        const eliminarBtn = btnEliminar("productos", id);
        contenedor.appendChild(editarBtn);
        contenedor.appendChild(eliminarBtn);

        editarBtn.addEventListener("click", () => {
            sessionStorage.setItem("editId", id);
            window.location.hash = "#/productos/editar";
        });

        eliminarBtn.addEventListener("click", async () => {
            sessionStorage.setItem("deleteId", id);
            window.location.hash = "#/productos/eliminar";
        });

        eliminarBtn.addEventListener("click", async () => {
            const confirmar = confirm(`¿Deseas eliminar el producto "${id}"?`);

            if (!confirmar) return;

            try {
                await eliminarProducto(id);

                contenedor.closest(".producto-card").remove();
            } catch (error) {
                console.error(error);
                alert("No se pudo eliminar el producto");
            }
        });
    });
};
