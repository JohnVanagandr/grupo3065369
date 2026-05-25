const BASE_URL = "http://10.0.103.147:3001/";

export const Post = async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Error en POST");
    }
    return await response.json();
}