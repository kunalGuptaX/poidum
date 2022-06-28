import { Box, Divider, Flex, Icon, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { GoBold, GoCode, GoItalic } from "react-icons/go";
import { MdFormatUnderlined } from "react-icons/md";
import { BiText } from "react-icons/bi";

type Props = {
  onToggle: (blockType: string) => void;
  editorRef: any;
  inlineStyleTypes?: string[];
  top: number;
  left: number;
  blockType: string;
};

const StyledIconButton = styled(IconButton)`
  :hover {
    background-color: transparent;
  }
  :active,
  *&[data-active] {
    background-color: transparent;
  }
  color: ${(props) => (props.isActive ? "#c4ffc4" : "white")};
`;

export const InlineFormattingToolbar = ({
  onToggle,
  editorRef,
  top,
  left,
  inlineStyleTypes,
  blockType,
}: Props) => {
  return (
    <Flex
      style={{
        top: top,
        left: left,
      }}
      position="absolute"
      zIndex={20}
      shadow="lg"
      background="linear-gradient(to bottom,rgba(49,49,47,.99),#262625)"
      borderRadius="8px"
      padding="0 4px"
    >
      <StyledIconButton
        aria-label="Search database"
        variant="ghost"
        icon={<GoBold />}
        borderRadius={0}
        backgroundColor="transparent"
        color="white"
        size="lg"
        isActive={inlineStyleTypes?.includes("BOLD")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("BOLD");
          editorRef.current?.focus();
        }}
      />
      <StyledIconButton
        aria-label="Search database"
        variant="ghost"
        icon={<GoItalic />}
        borderRadius={0}
        backgroundColor="transparent"
        color="white"
        size="lg"
        isActive={inlineStyleTypes?.includes("ITALIC")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("ITALIC");
          editorRef.current?.focus();
        }}
      />
      <StyledIconButton
        aria-label="Search database"
        variant="ghost"
        icon={<MdFormatUnderlined />}
        borderRadius={0}
        size="lg"
        backgroundColor="transparent"
        color="white"
        isActive={inlineStyleTypes?.includes("UNDERLINE")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("UNDERLINE");
          editorRef.current?.focus();
        }}
      />
      <Divider
        height="30px"
        borderColor="rgba(255,255,255,.2)"
        orientation="vertical"
      />
      <StyledIconButton
        aria-label="Code"
        variant="ghost"
        icon={<GoCode size={18} />}
        borderRadius={0}
        size="lg"
        backgroundColor="transparent"
        color="white"
        isActive={inlineStyleTypes?.includes("CODE")}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("CODE");
          editorRef.current?.focus();
        }}
      />
      <Divider
        height="30px"
        borderColor="rgba(255,255,255,.2)"
        orientation="vertical"
      />
      <StyledIconButton
        aria-label="Search database"
        variant="ghost"
        icon={<BiText />}
        borderRadius={0}
        size="lg"
        backgroundColor="transparent"
        color="white"
        isActive={blockType === "header-large"}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("header-large");
          editorRef.current?.focus();
        }}
      />
      <StyledIconButton
        aria-label="Search database"
        variant="ghost"
        icon={<BiText size={14} />}
        borderRadius={0}
        size="lg"
        backgroundColor="transparent"
        color="white"
        isActive={blockType === "header-small"}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle("header-small");
          editorRef.current?.focus();
        }}
      />
    </Flex>
  );
};
