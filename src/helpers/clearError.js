export const clearError = (errorElement, inputElement) => {
    errorElement.textContent = "";
    inputElement.classList.remove("error");
};