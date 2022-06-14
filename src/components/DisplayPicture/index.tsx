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
  overrideUrl,
}: AvatarProps & { override?: File; overrideUrl?: string }) => {
  const { data, status } = useSession();

  if (!overrideUrl && (status === "loading" || !data)) {
    return null;
  }

  return (
    <WrapItem>
      <ChakraAvatar
        size={size || "2xl"}
        {...(data?.displayPicture || overrideUrl
          ? {
              src: override
                ? URL.createObjectURL(override)
                : overrideUrl || (data?.displayPicture as string),
            }
          : {
              name: `${data?.firstName} ${data?.lastName}`,
              src: override
                ? URL.createObjectURL(override)
                : "https://bit.ly/sage-adebayo",
            })}
      />
    </WrapItem>
  );
};

export default DisplayPicture;
