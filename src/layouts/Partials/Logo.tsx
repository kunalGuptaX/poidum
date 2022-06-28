import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  width?: number;
  height?: number;
  alt: string;
};

const Logo = ({ width, height, alt }: Props) => {
  return (
    <Box padding="40px 0">
      <Image
        src="/images/LogoSmall.svg"
        width={width || "100%"}
        height={height || 23}
        alt={alt}
      />
    </Box>
  );
};

export default Logo;
