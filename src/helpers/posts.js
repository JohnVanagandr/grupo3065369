const BASE_URL = "http://10.0.103.206:3001/";

export const Post = async (endpoint, id, datosactualizados) => {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
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