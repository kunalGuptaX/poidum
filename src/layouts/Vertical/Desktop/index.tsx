import { Box, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import DesktopNavbarItems from "./Partials/DesktopNavbarItems";

type Props = {
  children: React.ReactNode;
  session?: Session;
  sideContent?: React.ReactNode;
};

export const DesktopVerticalLayout = ({ session, children, sideContent }: Props) => {
  return (
    <div style={{ maxWidth: "1504px", margin: "auto", position: "relative" }}>
      <Flex>
        <DesktopNavbarItems />
        <Box height="100vh" overflow="auto" width="100%">
          {children}
        </Box>
      </Flex>
    </div>
  );
};

