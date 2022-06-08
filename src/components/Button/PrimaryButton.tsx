import { Button as ChakraButton, ButtonProps, chakra } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const PrimaryButton = chakra(ChakraButton, {
  baseStyle: {
    backgroundColor: "#000",
    borderRadius: "0",
    color: "white",
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: "20px",
    padding: "15px 24px",
    height: "auto",
    _hover: {
      backgroundColor: "#000",
      opacity: 0.6,
    },
    _active: {
      backgroundColor: "#000",
      opacity: 0.8,
    },
  },
});

export const SmallPrimaryButton = chakra(PrimaryButton, {
  baseStyle: {
    textTransform: "none",
    fontSize: "16px",
    padding: "0 16px",
    height: "42px",
  },  
});
