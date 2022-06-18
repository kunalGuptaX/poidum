import { Box, Divider, Flex, IconButton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import DisplayPicture from "../DisplayPicture";

type Props = {
  direction?: "row" | "column";
};

const AuthenticatedNavbarItems = ({ direction = "column" }: Props) => {
  const router = useRouter();
  const commonStyles =
    direction === "row"
      ? {
          flex: 1,
          display: "flex",
        }
      : {};
  return (
    <>
      <Stack
        spacing={4}
        direction={direction}
        alignItems="center"
        width="100%"
        justifyContent={direction === "row" ? "space-between" : "normal"}
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
        {direction === "column" ? (
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
        ) : (
          <Box justifyContent="center" {...commonStyles}>
            <DisplayPicture size="sm" />
          </Box>
        )}
      </Stack>
      {direction === "column" ? (
        <Box padding="30px">
          <DisplayPicture size="sm" />
        </Box>
      ) : null}
    </>
  );
};

export default AuthenticatedNavbarItems;
