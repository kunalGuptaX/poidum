import { Box, Flex, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoBookmarksOutline } from "react-icons/io5";
import { RiNotificationLine } from "react-icons/ri";
import { DisplayPicture } from "../../../../atoms";

const MobileNavbarItems = () => {
  const commonStyles = {
    flex: 1,
    display: "flex",
  };
  return (
    <Flex
      borderRight="1px solid rgba(230, 230, 230, 1)"
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      position="fixed"
      bottom={0}
      boxShadow="0px 2px 10px rgb(0 0 0 / 15%)"
      height="56px"
      width="100%"
      zIndex={200}
      backgroundColor="white"
    >
      <Stack
        spacing={4}
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <IconButton
          aria-label="Home"
          variant="ghost"
          colorScheme="blackAlpha"
          size="lg"
          icon={<AiOutlineHome size={24} />}
          {...commonStyles}
        />
        <IconButton
          aria-label="Home"
          variant="ghost"
          colorScheme="blackAlpha"
          size="lg"
          icon={<RiNotificationLine size={24} />}
          {...commonStyles}
        />
        <IconButton
          aria-label="Home"
          variant="ghost"
          colorScheme="blackAlpha"
          size="lg"
          icon={<IoBookmarksOutline size={24} />}
          {...commonStyles}
        />
        <Box justifyContent="center" {...commonStyles}>
          <DisplayPicture size="sm" isUserPicture />
        </Box>
      </Stack>
    </Flex>
  );
};

export default MobileNavbarItems;
