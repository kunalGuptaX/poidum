import { Box, Divider, Flex, IconButton, Stack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import { PrimaryButton } from "../../atoms/Button";
import DisplayPicture, { DisplayPicturePopover } from "../DisplayPicture";

type Props = {};

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
        <Box>
          <Image src="/images/LogoSmall.svg" width="100%" height={23} />
        </Box>
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
              <Stack>
                <Stack
                  spacing={5}
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  padding="25px"
                  paddingTop="35px"
                  paddingBottom="10px"
                >
                  <DisplayPicture size="md" />
                  <Box>
                    <Box
                      fontWeight="600"
                      fontSize="14px"
                    >{`${session.firstName} ${session.lastName}`}</Box>
                    <Box color="rgba(0,0,0,.54)" fontSize="14px">
                      @kunalgupta96
                    </Box>
                  </Box>
                </Stack>
                <Divider />
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Write a story
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Stories
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Stats
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Design your profile
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Settings
                </Box>
                <Divider />
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  List
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Publications
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Control your recommendations
                </Box>
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                >
                  Medium Partner Program
                </Box>
                <Divider />
                <Box
                  padding="7px 25px"
                  cursor="pointer"
                  fontSize="13px"
                  fontFamily="Noto Sans JP"
                  paddingBottom="18px"
                >
                  Sign out
                </Box>
              </Stack>
            </DisplayPicturePopover>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default IsolatedNavbar;
