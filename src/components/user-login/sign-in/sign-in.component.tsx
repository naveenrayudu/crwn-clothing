import React, { SyntheticEvent } from "react";
import IDefaultComponentProps from "../../../models/interfaces/IDefaultComponentProps";
import FormInput from "../../form-input/form-input.component";
import { IFormInputHandler } from "../../../models/interfaces/IFormInputHandler";

import { signInWithGoogle } from "../../../firebase/firebase.util";

import "./sign-in.styles.scss";
import CustomButtom from "../../custom-button/custom-button.component";

interface ISignInState {
  email: IFormInputHandler;
  password: IFormInputHandler;
}

class SignIn extends React.Component<IDefaultComponentProps, ISignInState> {
  constructor(props: IDefaultComponentProps) {
    super(props);
    this.state = {
      email: {
        id: "email",
        labelName: "Email",
        name: "email",
        type: "email",
        value: "",
        isValid: false,
        isTouched: false,
        placeholder: "Email",
        validation: {
          required: true,
          errorMessage: "Email is required."
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
        validation: {
          required: true,
          errorMessage: "Password is required."
        }
      }
    };
  }

  onFormInputChangeHandler = (
    e: SyntheticEvent,
    targetField: keyof ISignInState
  ) => {
    const inputField: IFormInputHandler = { ...this.state[targetField] };
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement
    ) {
      inputField.value = e.target.value;
      this.setState({
        [targetField]: inputField
      } as Pick<ISignInState, keyof ISignInState>);
    }
  };

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.onFormSubmit}>
          <FormInput
            {...this.state.email}
            onChangeHandler={(e: SyntheticEvent) =>
              this.onFormInputChangeHandler(e, "email")
            }
            errorMessage={this.state.email.validation.errorMessage}
          />
          <FormInput
            {...this.state.password}
            onChangeHandler={(e: SyntheticEvent) =>
              this.onFormInputChangeHandler(e, "password")
            }
            errorMessage={this.state.password.validation.errorMessage}
          />

          <div className="singIn-button--container">
            <CustomButtom
              type="button"
              onClick={() =>
                console.log(this.state.email.value, this.state.password.value)
              }
            >
              Sign In
            </CustomButtom>
            <CustomButtom type="button" onClick={signInWithGoogle} isGoogleSignIn={true}>
              Sign With Google
            </CustomButtom>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
