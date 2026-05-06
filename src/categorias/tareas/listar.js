import { get } from '../api.js';
import { crearCategoriaCard } from './categoriaCard.js';

const cardContainer = document.querySelector('#card-container');

export const cargarCategorias = async () => {

    cardContainer.innerHTML = '';

    try {
        const categorias = await get('categorias');

        categorias.forEach(categoria => {
            const card = crearCategoriaCard(categoria);
            cardContainer.appendChild(card);
        });

    } catch (error) {
        const msg = document.createElement('p');
        msg.textContent = 'Error al cargar las categorías.';
        cardContainer.appendChild(msg);
    }
};