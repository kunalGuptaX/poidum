import { Heading as ChakraHeading } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Heading = styled(ChakraHeading)<{ size?: "sm" | "md" | "lg" }>`
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css``;
      case "lg":
        return css``;
      case "md":
      default:
        return css`
          font-family: "New York", serif;
          font-weight: 800;
          text-align: center;
        `;
    }
  }}
`;
