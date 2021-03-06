import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import Navbar from "../../oragnisms/Navbar";

type Props = {
  session: Session;
  children: React.ReactNode;
};

export const HorizontalLayout = ({ session, children }: Props) => {
  return (
    <>
      <Navbar session={session} />
      <Box marginTop="75px" padding="24px">{children}</Box>
    </>
  );
};
