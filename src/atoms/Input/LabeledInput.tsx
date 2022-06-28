import {
  chakra,
  FormControl,
  FormLabel,
  InputProps,
  Input as ChakraInput,
} from "@chakra-ui/react";
import React from "react";

export const Input = chakra(ChakraInput, {
  baseStyle: {
    borderColor: "#000",
    borderRadius: "0",
    _focusVisible: {
      borderColor: "#000",
      borderRadius: "0",
      borderWidth: "1px",
      boxShadow: "0 0 0 1px #000",
    },
    _hover: {
      borderColor: "#000",
      borderWidth: "1.5px",
    },
    padding: "18px 12px",
    height: "auto",
    fontSize: "16px",
    color: "#000",
  },
});

interface Props extends InputProps {
  label: string;
}
const StyledLabel = chakra(FormLabel, {
  baseStyle: {
    fontSize: "16px",
    fontWeight: 500,
  },
});

export const LabeledInput = ({ label, ...props }: Props) => {
  return (
    <FormControl>
      <StyledLabel>{label}</StyledLabel>
      <Input {...props} />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
  );
};
