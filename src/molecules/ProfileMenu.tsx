import { Box, Divider, Stack } from "@chakra-ui/react";
import React from "react";
import { DisplayPicture } from "../atoms";

interface ProfileMenuProps {
  userName: string;
}

export const ProfileMenu = ({ userName }: ProfileMenuProps) => {
  return (
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
          <Box fontWeight="600" fontSize="14px">
            {userName}
          </Box>
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
  );
};
