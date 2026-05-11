import { showError } from "./index.js";
import { clearError } from "./index.js";

export const isValidInput = (inputElement, rule, errorElement) => {

    const value = inputElement.value.trim();

    if (rule.required && !value) {

        showError(
            errorElement,
            rule.message || "Este campo es obligatorio",
            inputElement
        );

        return false;
    }

    if (rule.type === "url") {

        const regexURL =
            /^(https?:\/\/)([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

        if (!regexURL.test(value)) {

            showError(
                errorElement,
                "Debes ingresar una URL válida",
                inputElement
            );

            return false;
        }
    }

    clearError(errorElement, inputElement);
    return true;
};