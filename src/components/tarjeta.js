export const crearCategoriaCard = (categoria) => {
    const nombreSlug = encodeURIComponent(categoria.nombre);

    const card = document.createElement('div');
    card.classList.add('categoria-card');

    const img = document.createElement('img');
    img.classList.add('categoria-card__img');
    img.src = `https://via.placeholder.com/290x180/e8e9ee/2c3250?text=${nombreSlug}`;
    img.alt = `Imagen de ${categoria.nombre}`;

    const body = document.createElement('div');
    body.classList.add('categoria-card__body');

    const header = document.createElement('div');
    header.classList.add('categoria-card__header');

    const titulo = document.createElement('p');
    titulo.classList.add('categoria-card__titulo');
    titulo.textContent = categoria.nombre;

    const id = document.createElement('p');
    id.classList.add('categoria-card__id');
    id.textContent = `#${categoria.id}`;

    header.appendChild(titulo);
    header.appendChild(id);

    const desc = document.createElement('p');
    desc.classList.add('categoria-card__desc');
    desc.textContent = categoria.descripcion ?? '';

    const count = document.createElement('p');
    count.classList.add('categoria-card__count');
    count.textContent = 'Cantidad de productos: ';

    const countSpan = document.createElement('span');
    countSpan.classList.add('count-value');
    countSpan.textContent = categoria.totalProductos ?? 0;
    count.appendChild(countSpan);

    const actions = document.createElement('div');
    actions.classList.add('categoria-card__actions');

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.classList.add('categoria-card__btn', 'categoria-card__btn--editar');
    btnEditar.textContent = 'Editar';

    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.classList.add('categoria-card__btn', 'categoria-card__btn--eliminar');
    btnEliminar.textContent = 'Eliminar';

    const linkVer = document.createElement('a');
    linkVer.href = `../productos/productos.html?categoriaId=${categoria.id}`;
    linkVer.classList.add('categoria-card__btn', 'categoria-card__btn--ver');
    linkVer.style.textDecoration = 'none';
    linkVer.style.display = 'inline-block';
    linkVer.style.textAlign = 'center';
    linkVer.textContent = 'Ver Productos';

    actions.appendChild(btnEditar);
    actions.appendChild(btnEliminar);
    actions.appendChild(linkVer);

    body.appendChild(header);
    body.appendChild(desc);
    body.appendChild(count);
    body.appendChild(actions);

    card.appendChild(img);
    card.appendChild(body);

    return card;
};