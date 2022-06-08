import {
  WrapItem,
  Avatar as ChakraAvatar,
  AvatarProps,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const DisplayPicture = ({
  size,
  override,
}: AvatarProps & { override?: File }) => {
  const { data, status } = useSession();

  if (status === "loading" || !data) {
    return null;
  }

  return (
    <WrapItem>
      <ChakraAvatar
        size={size || "2xl"}
        {...(data.displayPicture
          ? {
              src: override
                ? URL.createObjectURL(override)
                : (data.displayPicture as string),
            }
          : {
              name: `${data.firstName} ${data.lastName}`,
              src: override
                ? URL.createObjectURL(override)
                : "https://bit.ly/sage-adebayo",
            })}
      />
    </WrapItem>
  );
};

export default DisplayPicture;
