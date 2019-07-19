import React, { SyntheticEvent } from "react";
import FormInput from "../../form-input/form-input.component";
import IDefaultComponentProps from "../../../models/interfaces/IDefaultComponentProps";
import {
  IFormInputHandler,
  IValidationTypes
} from "../../../models/interfaces/IFormInputHandler";
import CustomButton from "../../custom-button/custom-button.component";

import "./sign-up.styles.scss";
import { validateInput } from "../../../utilities/validateFields";
import { auth, createOrSetUpUserBySignIn } from "../../../firebase/firebase.util";
import { ISignedInUserInfo } from "../../../models/interfaces/IUserAccount";

type ISignUpFields = {
  displayName: IFormInputHandler;
  email: IFormInputHandler;
  password: IFormInputHandler;
  confirmPassword: IFormInputHandler;
};

type ISignUpState = {
  form: {
    isValid: boolean;
    errorMessage: string,
    fields: ISignUpFields;
  };
};


const signUpFormFeilds: ISignUpFields =  {
    email: {
      id: "email",
      name: "email",
      value: "",
      labelName: "Email",
      placeholder: "Email",
      isTouched: false,
      isValid: false,
      type: "email",
      errorMessage: "",
      validation: {
        required: {
          errorMessage: "Email is required"
        },
        typeProperty: {
          type: "email",
          errorMessage: "Invalid email address."
        }
      }
    },
    displayName: {
      id: "displayName",
      name: "displayName",
      value: "",
      labelName: "Display Name",
      placeholder: "Display Name",
      isTouched: false,
      isValid: false,
      type: "text",
      errorMessage: "",
      validation: {
        required: {
          errorMessage: "Display Name is required"
        }
      }
    },
    password: {
      id: "password",
      name: "password",
      value: "",
      labelName: "Password",
      placeholder: "Password",
      isTouched: false,
      isValid: false,
      type: "password",
      errorMessage: "",
      validation: {
        required: {
          errorMessage: "Password is required"
        }
      }
    },
    confirmPassword: {
      id: "confirmPassword",
      name: "confirmPassword",
      value: "",
      labelName: "Confirm Password",
      placeholder: "Confirm Password",
      isTouched: false,
      isValid: false,
      type: "password",
      errorMessage: "",
      validation: {
        required: {
          errorMessage: "Confirm Password is required"
        },
        dependentProperty: {
          value: "",
          errorMessage: "Password and confirm password dont match"
        }
      }
    }
  }

class SignUp extends React.Component<IDefaultComponentProps, ISignUpState> {
  constructor(props: IDefaultComponentProps) {
    super(props);

    this.state = {
      form: {
        isValid: false,
        errorMessage: '',
        fields: signUpFormFeilds
      }
    };
  }

  onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let formState = { ...this.state.form };
    const keys = Object.keys(formState.fields);

    keys.forEach(key => {
      let transFormedKey = key as keyof ISignUpFields;
      formState = this.validateFields(
        transFormedKey,
        formState.fields[transFormedKey].value,
        ["required", "typeProperty", "dependentProperty"],
        this.state.form.fields.password.value
      );
    });

    if(formState.isValid) {
       const emailValue = this.state.form.fields.email.value;
       const passwordValue = this.state.form.fields.password.value;

        try {
            const {user} = await auth.createUserWithEmailAndPassword(emailValue, passwordValue);
            let signedUpUser = {} as ISignedInUserInfo;
            signedUpUser.email = user!.email;
            signedUpUser.displayName = this.state.form.fields.displayName.value;
            signedUpUser.emailVerified =  user!.emailVerified;
            signedUpUser.uid = user!.uid;


            if(user)
                await createOrSetUpUserBySignIn(signedUpUser, {});
        } catch (error) {
            formState.errorMessage = error.message;
            this.setState({
                form: formState
            })
        }
    }
  };

  onFormInputChange = (e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const targetName: keyof ISignUpFields = e.target
        .name as keyof ISignUpFields;

      let updatedForm = this.validateFields(
        targetName,
        e.target.value,
        ["required", "dependentProperty"],
        this.state.form.fields.password.value
      );

      if (
        targetName === "password" &&
        this.state.form.fields.confirmPassword.isTouched
      ) {
        updatedForm = this.validateFields(
          "confirmPassword" as keyof ISignUpFields,
          this.state.form.fields.confirmPassword.value,
          ["dependentProperty"],
          updatedForm.fields.password.value
        );
      }

      updatedForm.errorMessage = '';

      this.setState({
        form: updatedForm
      });
    }
  };

  onFormInputBlur = (e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const updatedForm = this.validateFields(
        e.target.name as keyof ISignUpFields,
        e.target.value,
        ["required", "typeProperty", "dependentProperty"],
        this.state.form.fields.password.value
      );

      this.setState({
        form: updatedForm
      });
    }
  };

  validateFields = (
    name: keyof ISignUpFields,
    value: string,
    propsToVerify: (keyof IValidationTypes)[],
    dependentValue?: string
  ) => {
    const updatedForm = {
      ...this.state.form
    };

    let inputState: IFormInputHandler = {
      ...(this.state.form.fields[name] as IFormInputHandler),
      value: value
    };

    if (name === "confirmPassword") {
      inputState.validation.dependentProperty!.value = dependentValue!;
    }

    updatedForm.fields[name] = validateInput(inputState, propsToVerify);
    updatedForm.isValid = true;
    for (const prop in updatedForm.fields) {
      if (updatedForm.fields.hasOwnProperty(prop)) {
        if (!updatedForm.fields[prop as keyof ISignUpFields].isValid) {
          updatedForm.isValid = false;
        }
      }
    }

    return updatedForm;
  };

  render() {
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>

        <form noValidate>
          <FormInput
            {...this.state.form.fields.displayName}
            onChangeHandler={this.onFormInputChange}
            onBlur={this.onFormInputBlur}
            errorMessage={this.state.form.fields.displayName.errorMessage}
          />
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
          <FormInput
            {...this.state.form.fields.confirmPassword}
            onChangeHandler={this.onFormInputChange}
            onBlur={this.onFormInputBlur}
            errorMessage={this.state.form.fields.confirmPassword.errorMessage}
          />

          {
              this.state.form.errorMessage ? (
                <div className="error">
                    {this.state.form.errorMessage}
                </div>
              ): null
          }

         

          <CustomButton
            disabled={!this.state.form.isValid}
            type="button"
            onClick={this.onFormSubmit}
          >
            Sign Up
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
