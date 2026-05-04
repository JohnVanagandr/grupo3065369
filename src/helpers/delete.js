const BASE_URL = "http://localhost:3000/";

export const remove = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error en DELETE");
    }
    return await response.json();
}