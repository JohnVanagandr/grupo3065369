import { url } from "./config";

export const Put = async (endpoint, id, body) => {
    const response = await fetch(`${url}${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
};