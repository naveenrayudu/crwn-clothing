import { IFormInputHandler, IValidationTypes } from "../models/interfaces/IFormInputHandler";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateInput = (inputToVerify: IFormInputHandler, propsToVerify: (keyof IValidationTypes)[]): IFormInputHandler => {
    inputToVerify.isTouched = true;
    inputToVerify.isValid = true;

    propsToVerify.some(prop => {
        if (inputToVerify.validation[prop]) {
            let isValid = true;
            switch (prop) {
                case 'required':
                    if (!inputToVerify.value || !inputToVerify.value.trim()) {
                        isValid = false;
                    }
                    break;
                case 'typeProperty':
                    if (inputToVerify.validation[prop]!.type === "email" && !emailRegex.test(inputToVerify.value)) {
                        isValid = false;
                    }
                    break;
                case 'dependentProperty':
                    if (inputToVerify.validation[prop]!.value !== inputToVerify.value) {
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }

            if (!isValid) {
                inputToVerify.isValid = isValid;
                inputToVerify.errorMessage = inputToVerify.validation[prop]!.errorMessage
                return true;
            }

            return false;
        }
    })

    return inputToVerify;
}

