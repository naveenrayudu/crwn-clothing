import React from "react";
import { IInputHandler } from "../../models/interfaces/IFormInputHandler";

import "./form-input.styles.scss";

interface IFormInputChangeHandler extends IInputHandler {
  errorMessage: string;
  onChangeHandler: any;
}

const FormInput: React.FC<IFormInputChangeHandler> = ({
  id,
  labelName,
  name,
  type,
  value,
  isTouched,
  isValid,
  errorMessage,
  placeholder,
  onChangeHandler
}) => {
  return (
    <div className="group">
      <input
        className="form-input"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChangeHandler}
      />
      <label className={`${value.length !== 0 ? 'shrink' : ''} form-input-label`} htmlFor="id">
        {labelName}
      </label>

      {isTouched && isValid && errorMessage ? <div>{errorMessage}</div> : null}
    </div>
  );
};

export default FormInput;
