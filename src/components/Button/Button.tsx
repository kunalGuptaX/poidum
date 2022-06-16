import { Button as ChakraButton, ButtonProps, chakra } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const StyledPrimaryButton = styled(ChakraButton)<{
  size?: "sm" | "md" | "lg";
}>`
  background-color: #000;
  border-color: #000;
  border-radius: 0;
  color: white;
  font-weight: 400;
  font-size: 13px;
  border-radius: 25px;
  font-family: 'Noto Sans JP';
  height: auto;
  :hover {
    background-color: #000;
    opacity: 0.6;
  }
  :active {
    background-color: "#000";
    opacity: 0.8;
  }
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css``;
      case "lg":
        return css`
          padding: 15px 24px;
          font-size: 20px;
          text-transform: uppercase;
        `;
      case "md":
      default:
        return css`
          padding: 9px 16px 11px;
        `;
    }
  }}
`;

const StyledSecondaryButton = styled(ChakraButton)<{
  size?: "sm" | "md" | "lg";
}>`
  border-color: rgb(168, 168, 168);
  background-color: transparent;
  border-radius: 0;
  color: #000;
  border-radius: 0;
  font-weight: 400;
  font-size: 13px;
  border-radius: 25px;
  font-family: 'Noto Sans JP';
  :hover {
    border-color: #000;
    background-color: transparent;
  }
  :active {
    border-color: #000;
    background-color: transparent;
    opacity: 0.8;
  }
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css``;
      case "lg":
        return css`
          padding: 15px 24px;
          font-size: 20px;
          text-transform: uppercase;
        `;
      case "md":
      default:
        return css`
          padding: 9px 16px 11px;
        `;
    }
  }}
`;

export const SecondaryButton = (
  props: Omit<ButtonProps, "size"> & { size?: "sm" | "md" | "lg" }
) => {
  return <StyledSecondaryButton variant="outline" {...props} />;
};

export const PrimaryButton = (
  props: Omit<ButtonProps, "size"> & { size?: "sm" | "md" | "lg" }
) => {
  return <StyledPrimaryButton variant="outline" {...props} />;
};
