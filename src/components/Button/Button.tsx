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
  font-weight: 700;
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
          padding: 12px 20px;
        `;
    }
  }}
`;

const StyledSecondaryButton = styled(ChakraButton)<{
  size?: "sm" | "md" | "lg";
}>`
  border-color: #000;
  background-color: "transparent";
  border-radius: 0;
  color: #000;
  font-weight: 700;
  height: auto;
  :hover {
    border: 1x solid #000;
    background-color: "transparent";
    opacity: 0.6;
  }
  :active {
    border: 1x solid #000;
    background-color: "transparent";
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
          padding: 12px 20px;
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
