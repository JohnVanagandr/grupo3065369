export function loadComponents(id, path) {
    return fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error', error));
}
