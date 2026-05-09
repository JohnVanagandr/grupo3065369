export const showError = (errorElement, message, inputElement) => {
    errorElement.textContent = message;
    inputElement.classList.add("error");
};