import { Box, Divider, Flex, IconButton, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { DisplayPicture } from "../../../../atoms";
import {Logo} from "../../../../atoms";

const DesktopNavbarItems = () => {
  const router = useRouter();

  return (
    <Flex
      borderRight="1px solid rgba(230, 230, 230, 1)"
      justifyContent="space-between"
      alignItems="center"
      width="88px"
      height="100vh"
      direction="column"
    >
      <Logo alt="Podium" />
      <Stack
        spacing={4}
        direction="column"
        alignItems="center"
        width="100%"
        justifyContent="normal"
      >
        <IconButton
          aria-label="Home"
          variant="ghost"
          colorScheme="blackAlpha"
          size="lg"
          icon={<AiOutlineHome size={24} />}
        />
        <IconButton
          aria-label="Home"
          variant="ghost"
          colorScheme="blackAlpha"
          size="lg"
          icon={<RiNotificationLine size={24} />}
        />
        <IconButton
          aria-label="Home"
          variant="ghost"
          colorScheme="blackAlpha"
          size="lg"
          icon={<IoBookmarksOutline size={24} />}
        />
        <>
          <IconButton
            aria-label="Home"
            variant="ghost"
            colorScheme="blackAlpha"
            size="lg"
            icon={<MdOutlineArticle size={24} />}
          />
          <Divider
            width="24px"
            margin="0 auto"
            borderColor="rgba(230, 230, 230, 1)"
          />

          <IconButton
            aria-label="Home"
            variant="ghost"
            colorScheme="blackAlpha"
            size="lg"
            icon={<BiEdit size={24} />}
            onClick={() => router.push("/new-post")}
          />
        </>
      </Stack>
      <Box padding="30px">
        <DisplayPicture size="sm" />
      </Box>
    </Flex>
  );
};

export default DesktopNavbarItems;
