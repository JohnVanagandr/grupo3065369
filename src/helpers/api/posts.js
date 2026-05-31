import { url } from "./config";

export const Post = async (endpoint, data) => {
    const response = await fetch(`${url}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(datosactualizados),
        headers: {
            "Content-type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Error en POST");
    }
    return await response.json();
}