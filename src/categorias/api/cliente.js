// URL de la API
const BASE_URL = "http://localhost:3000/api/posts";

// Funciones para interactuar con la API
export const getPosts = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en el posts:", error);
        return [];
    }
}

// Función para crear un post
export const createPost = async (post) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la creación del post:", error);
        return null;
    }
}

// Función para actualizar un post
export const updatePost = async (id, post) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la actualización del post:", error);
        return null;
    }
}

// Función para eliminar un post
export const deletePost = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
        return response.ok;
    } catch (error) {
        console.error("Error en la eliminación del post:", error);
        return false;
    }
}