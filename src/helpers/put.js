// Cambiamos el nombre de "Post" a "Put" en la declaración
export const Put = async (url, id, body) => {
    try {
        const response = await fetch(`http://localhost:3000/${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
        })
        if(!response.ok){
            throw new Error(`Error http: ${response.status}`);
        }
        const json = await response.json();
        console.log("Registro actualizado con exito: ", json);
        return json;
    }
    catch(error){
        console.error("Error al ejecutar la update: ", error);
    }
};