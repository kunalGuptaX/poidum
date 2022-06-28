import { useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { DesktopVerticalLayout } from "./Desktop";
import MobileVerticalLayout from "./Mobile";

type Props = {
  children: React.ReactNode;
};

export const VerticalLayout = ({ children }: Props) => {
  const [isSmallerThan1080] = useMediaQuery("(max-width: 1080px)", {
    ssr: true,
  });

  if (!isSmallerThan1080) {
    return <DesktopVerticalLayout>{children}</DesktopVerticalLayout>;
  } else {
    return <MobileVerticalLayout middleContent={children} />;
  }
};
