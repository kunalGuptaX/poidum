import React from "react";
import { Box, Flex, IconButton, Stack } from "@chakra-ui/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import { PrimaryButton } from "../atoms/Button";
import { DisplayPicturePopover } from "../molecules/DisplayPicturePopover";
import { Logo } from "../atoms";
import { ProfileMenu } from "../molecules/ProfileMenu";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

const IsolatedNavbar = ({ session }: Props) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      width="100%"
      height="65px"
      backgroundColor="white"
      zIndex={200}
    >
      <Flex
        maxWidth="1072px"
        height="100%"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px"
        margin="0 auto"
        width="100%"
      >
        <Logo alt="Podium" />
        <Stack
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <PrimaryButton
            style={{ backgroundColor: "#1a8917", border: "1px solid #1a8917" }}
            size="sm"
            type="submit"
          >
            Publish
          </PrimaryButton>
          <Stack
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="Home"
              variant="ghost"
              colorScheme="blackAlpha"
              icon={<MdMoreHoriz size={24} />}
            />
            <IconButton
              aria-label="Home"
              variant="ghost"
              colorScheme="blackAlpha"
              icon={<IoNotificationsOutline size={24} />}
            />
          </Stack>
          <Box>
            <DisplayPicturePopover size="sm">
              <ProfileMenu
                userName={`${session.firstName} ${session.lastName}`}
              />
            </DisplayPicturePopover>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default IsolatedNavbar;
