export const vistaFormulario = () => {
  return `
    <form class="form">
        <div class="form__header">
            <h2 class="form__titulo">INFORMACIÓN DEL PRODUCTO</h2>
        </div>

        <div class="form__campos">
            <label for="id">Id del producto:</label>
            <input type="text" id="id" class="form__input" readonly>
        </div>

        <div class="form__campos">
            <label for="nombre">Nombre del producto:</label>
            <input type="text" id="nombre" class="form__input">
        </div>

        <div class="form__campos">
            <label for="desc">Descripción:</label>
            <textarea id="desc" class="form__input"></textarea>
        </div>

        <div class="form__campos">
            <label for="url">Imagen:</label>
            <input type="text" id="url" class="form__input">
        </div>

        <div class="form_btn">
            <button type="submit" class="btn btn--guardar" id="saveForm">Guardar cambios</button>
            <button type="button" class="btn btn--cancelar" id="cancelForm">Cancelar</button>
        </div>
    </form>
  `;
};