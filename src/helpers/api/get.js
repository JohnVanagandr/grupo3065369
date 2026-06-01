export const get = async (endpoint) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error("Error en GET");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
