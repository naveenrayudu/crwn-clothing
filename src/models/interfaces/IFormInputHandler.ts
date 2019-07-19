import { placeholder } from "@babel/types";

export interface IInputHandler {
    id: string,
    placeholder: string,
    labelName: string,
    type: string,
    value: string,
    name: string,
    isValid: boolean,
    isTouched: boolean,
    errorMessage: string
}

export interface IValidationTypes {
    required?: {
        errorMessage: string
    },
    dependentProperty?: {
        value: string,
        errorMessage: string
    },
    typeProperty?: {
        type: "email",
        errorMessage: string
    }
}

export interface IFormInputHandler extends IInputHandler {
    validation: IValidationTypes
}
