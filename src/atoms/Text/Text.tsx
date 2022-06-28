import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";
import { useMemo } from "react";

interface TextProps extends ChakraTextProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "light" | "default" | "dark";
}

export const Text = ({ size, color, ...props }: TextProps) => {
  const fontSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "14px";
      default:
      case "md":
        return "16px";
    }
  }, [size]);

  const fontColor = useMemo(() => {
    switch (color) {
      case "light":
        return "rgba(117, 117, 117, 1)";
      default:
      case "default":
        return "rgba(41, 41, 41, 1)";
    }
  }, [color]);

  return <ChakraText {...props} fontSize={fontSize} color={fontColor} />;
};
