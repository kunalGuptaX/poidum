import { Box } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { TOOLBAR_DEFAULT_LEFT, TOOLBAR_DEFAULT_TOP } from "../constants";

type Props = {
  top: number;
};

const BlockFormattingToolbar = ({ top }: Props) => {
  return (
    <Box
      style={{
        top: top - TOOLBAR_DEFAULT_TOP,
        left: TOOLBAR_DEFAULT_LEFT,
      }}
      position="absolute"
      zIndex={20}
      backgroundColor="white"
    >
      <AiOutlineMore />
    </Box>
  );
};

export default BlockFormattingToolbar;
