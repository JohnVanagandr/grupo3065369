const BASE_URL = "http://localhost:3000/";

export const get = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error("Error en GET");
    }
    return await response.json();
}