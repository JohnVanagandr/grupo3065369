// Como variable se obtiene el endpoint con la URL
// Localhost:3000/users (por ejemplo)
export const Post = async (url, id,body) => {
    try{
        // Realiza la conexion al servidor usando la url y el put
        const response = await fetch(`http://localhost:3000/${url}/${id}`, {
            method: 'PUT',
            // transforma los datos recibidos en formato de texto JSON
            body: JSON.stringify(body),
            // define que el contenido enviado es de tipo json
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        // En caso que la respuesta es falsa pasara a true
        if(!response.ok){
            // Se lanza una excepcion
            throw new Error(`Error http: ${response.status}`);
        }
        // Se espera que la respuesta se transforme en json
        const json = await response.json();

        
        console.log("Registro actualizado con exito: ", json);
        
        return json;
    }
    catch(error){
        console.error("Error al ejecutar la update: ",error);
    }
};

