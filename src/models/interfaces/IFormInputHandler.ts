import { placeholder } from "@babel/types";

export interface IInputHandler {
    id: string,
    placeholder: string,
    labelName: string,
    type: string,
    value: string,
    name: string,
    isValid: false,
    isTouched: false
}

export interface IFormInputHandler extends IInputHandler {
    validation: {
        required: boolean,
        errorMessage: string
    }
}
