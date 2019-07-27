import React, { SyntheticEvent } from "react";
import IDefaultComponentProps from "../../../models/interfaces/IDefaultComponentProps";
import FormInput from "../../form-input/form-input.component";
import {
  IFormInputHandler,
  IValidationTypes
} from "../../../models/interfaces/IFormInputHandler";

import "./sign-in.styles.scss";
import CustomButtom from "../../custom-button/custom-button.component";
import { validateInput } from "../../../utilities/validateFields";

interface ISignInFields {
  email: IFormInputHandler;
  password: IFormInputHandler;
}

type ISignInState = {
  form: {
    isValid: boolean;
    errorMessage: string;
    fields: ISignInFields;
  };
};


type Sign_In_type = IDefaultComponentProps & {
  signInWithGoogle: any,
  signInWithEmail: any
}

class SignIn extends React.Component<Sign_In_type, ISignInState> {
  constructor(props: Sign_In_type) {
    super(props);
    this.state = {
      form: {
        isValid: false,
        errorMessage: "",
        fields: {
          email: {
            id: "email",
            labelName: "Email",
            name: "email",
            type: "email",
            value: "",
            isValid: false,
            isTouched: false,
            placeholder: "Email",
            errorMessage: "",
            validation: {
              required: {
                errorMessage: "Email is required."
              },
              typeProperty: {
                type: "email",
                errorMessage: "Invalid email address."
              }
            }
          },
          password: {
            id: "password",
            labelName: "Password",
            name: "password",
            type: "password",
            value: "",
            isValid: false,
            isTouched: false,
            placeholder: "Password",
            errorMessage: "",
            validation: {
              required: {
                errorMessage: "Password is required."
              }
            }
          }
        }
      }
    };
  }

  onFormInputChange = (e: SyntheticEvent, targetField: keyof ISignInState) => {
    if (e.target instanceof HTMLInputElement) {
      const targetName: keyof ISignInFields = e.target
        .name as keyof ISignInFields;

      let updatedForm = this.validateFields(targetName, e.target.value, [
        "required"
      ]);

      updatedForm.errorMessage = "";

      this.setState({
        form: updatedForm
      });
    }
  };

  onFormInputBlur = (e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const updatedForm = this.validateFields(
        e.target.name as keyof ISignInFields,
        e.target.value,
        ["required", "typeProperty"]
      );

      this.setState({
        form: updatedForm
      });
    }
  };

  validateFields = (
    name: keyof ISignInFields,
    value: string,
    propsToVerify: (keyof IValidationTypes)[]
  ) => {
    const updatedForm = {
      ...this.state.form
    };

    let inputState: IFormInputHandler = {
      ...(this.state.form.fields[name] as IFormInputHandler),
      value: value
    };

    updatedForm.fields[name] = validateInput(inputState, propsToVerify);
    updatedForm.isValid = true;
    for (const prop in updatedForm.fields) {
      if (updatedForm.fields.hasOwnProperty(prop)) {
        if (!updatedForm.fields[prop as keyof ISignInFields].isValid) {
          updatedForm.isValid = false;
        }
      }
    }

    return updatedForm;
  };

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formState = { ...this.state.form };
    const keys = Object.keys(formState.fields);

    keys.forEach(key => {
      let transFormedKey = key as keyof ISignInFields;
      formState = this.validateFields(
        transFormedKey,
        formState.fields[transFormedKey].value,
        ["required", "typeProperty"]
      );
    });

    if (formState.isValid) {
      const emailValue = this.state.form.fields.email.value;
      const passwordValue = this.state.form.fields.password.value;

      this.props.signInWithEmail(emailValue, passwordValue, (error: any) => {
        formState.errorMessage = error.message;
        this.setState({
          form: formState
        });
      })
    }
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form noValidate>
          <FormInput
            {...this.state.form.fields.email}
            onChangeHandler={this.onFormInputChange}
            onBlur={this.onFormInputBlur}
            errorMessage={this.state.form.fields.email.errorMessage}
          />
          <FormInput
            {...this.state.form.fields.password}
            onChangeHandler={this.onFormInputChange}
            onBlur={this.onFormInputBlur}
            errorMessage={this.state.form.fields.password.errorMessage}
          />

          {this.state.form.errorMessage ? (
            <div className="error">{this.state.form.errorMessage}</div>
          ) : null}

          <div className="singIn-button--container">
            <CustomButtom
              type="button"
              disabled={!this.state.form.isValid}
              onClick={this.onFormSubmit}
            >
              Sign In
            </CustomButtom>
            <CustomButtom
              type="button"
              onClick={this.props.signInWithGoogle}
              isGoogleSignIn={true}
            >
              Sign With Google
            </CustomButtom>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
