const BASE_URL = "http://localhost:3000/";

export const get = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error("Error en GET");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
