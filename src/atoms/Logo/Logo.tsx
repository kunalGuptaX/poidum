import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  width?: number;
  height?: number;
  alt: string;
};

export const Logo = ({ width, height, alt }: Props) => {
  return (
    <Link href="/">
      <Box padding="40px 0" cursor="pointer">
        <Image
          src="/images/LogoSmall.svg"
          width={width || "100%"}
          height={height || 23}
          alt={alt}
        />
      </Box>
    </Link>
  );
};
