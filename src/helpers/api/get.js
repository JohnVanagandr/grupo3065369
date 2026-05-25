import { url } from "./config";


export const get = async (endpoint) => {
    try {
        const response = await fetch(`${url}${endpoint}`);
        if (!response.ok) {
            throw new Error("Error en GET");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
