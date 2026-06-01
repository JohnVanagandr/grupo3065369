export const Post = async (endpoint, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
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