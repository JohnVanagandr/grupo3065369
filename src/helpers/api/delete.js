
//la direccion donde esta nuestra base de datos
const BASE_URL = "http://10.0.103.147:3001/";

//funcion para elimninar categorias, dentro de la base de datos
export const remove = async (endpoint) => {
    //se le indica al servidor que borre los datos en la ruta indicada por el endpoitn
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
    });
//si el servidor responde mal, lanza un aviso de error
    if (!response.ok) {
        throw new Error("Error en DELETE");
    }
    //si todo sale bien, regresa esta respuesta
    return await response.json();
};

export const eliminarCategoria = async (id, tarjetaHtml) => {
    //pregunta el usuario si de verdad quiere borrar
    const confirmar = confirm(`esta seguro que quieres elimnar la categoria #${id}?`)

    if(confirmar){
        try{

            //llamamaos a la funcion remover de arriba para borrarlos
            await remove(`categorias/${id}`);

            //si se borra corractamente del servidor, se borra de la tarjetahtml
            tarjetaHtml.remove();

        }catch(error){
            console.error("ocurrio un fallo", error);
            alert("error no se logro conectar con el servidor.")
        }


    }


}