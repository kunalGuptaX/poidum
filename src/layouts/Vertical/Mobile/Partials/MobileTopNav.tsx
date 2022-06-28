import { Flex } from "@chakra-ui/react";
import React from "react";
import Logo from "../../../Partials/Logo";

type Props = {};

const MobileTopNav = (props: Props) => {
  return (
    <Flex
      position="fixed"
      top="0"
      width="100%"
      height="56px"
      backgroundColor="white"
      alignItems="center"
      boxShadow="0px -2px 10px rgb(0 0 0 / 15%)"
      zIndex={20}
    >
      <Logo alt="podium" />
    </Flex>
  );
};

export default MobileTopNav;
