import styled, { css } from "styled-components";

const googleStyledButton = css`
  &.is-goolge-signin {
    background-color: #4285f4;
    color: white;

    &:hover {
      background-color: #357ae8;
      border: none;
    }
  }
`;

const invertedStyleButton = css`
  &.inverted {
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`;

const getButtonStyles = (props: {
  isGoogleSignIn?: boolean;
  inverted?: boolean;
}) => {
  if (props.isGoogleSignIn) return googleStyledButton;

  return props.inverted ? invertedStyleButton : css``;
};

const getDisabledStyles = (props: { disabled?: boolean }) => {
  return props.disabled
    ? css`
        opacity: 0.7;
        cursor: not-allowed;

        &:hover {
          background-color: black;
          color: white;
          border: none;
        }
      `
    : css``;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  ${getButtonStyles}

  ${getDisabledStyles}
`;
