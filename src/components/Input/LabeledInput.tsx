import { chakra, FormControl, FormLabel, InputProps } from "@chakra-ui/react";
import React from "react";
import { Input } from ".";

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
