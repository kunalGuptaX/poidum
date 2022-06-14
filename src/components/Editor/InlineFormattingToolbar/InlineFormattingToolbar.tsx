import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";

type Props = {
  onToggle: (blockType: string) => void;
  editorRef: any;
  inlineStyleTypes?: string[];
  top: number;
  left: number;
};

export const InlineFormattingToolbar = ({
  onToggle,
  editorRef,
  top,
  left,
  inlineStyleTypes,
}: Props) => {
  return (
    <Box
      style={{
        top: top,
        left: left,
      }}
      position="absolute"
      zIndex={20}
      shadow="lg"
      backgroundColor="white"
    >
      <IconButton
        aria-label="Search database"
        variant="outline"
        icon={<AiOutlineBold />}
        borderRadius={0}
        isActive={inlineStyleTypes?.includes("BOLD")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("BOLD");
          editorRef.current?.focus();
        }}
      />
      <IconButton
        aria-label="Search database"
        variant="outline"
        icon={<AiOutlineItalic />}
        borderRadius={0}
        isActive={inlineStyleTypes?.includes("ITALIC")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("ITALIC");
          editorRef.current?.focus();
        }}
      />
      <IconButton
        aria-label="Search database"
        variant="outline"
        icon={<AiOutlineUnderline />}
        borderRadius={0}
        isActive={inlineStyleTypes?.includes("UNDERLINE")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("UNDERLINE");
          editorRef.current?.focus();
        }}
      />
    </Box>
  );
};
