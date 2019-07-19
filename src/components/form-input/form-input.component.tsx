import React from "react";
import { IInputHandler } from "../../models/interfaces/IFormInputHandler";

import "./form-input.styles.scss";

interface IFormInputChangeHandler extends IInputHandler {
  errorMessage: string;
  onChangeHandler: any;
  onBlur?: any;
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
  onChangeHandler,
  onBlur
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
        onBlur={onBlur}
      />
      <label className={`${value.length !== 0 ? 'shrink' : ''} form-input-label`} htmlFor="id">
        {labelName}
      </label>

      {isTouched && !isValid && errorMessage ? <div className="error">{errorMessage}</div> : null}
    </div>
  );
};

export default FormInput;
