import {
  WrapItem,
  Avatar as ChakraAvatar,
  AvatarProps,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export interface DisplayPictureProps extends AvatarProps {
  overrideFile?: File;
  overrideUrl?: string;
  isUserPicture?: boolean;
}

export const DisplayPicture = ({
  size,
  overrideFile,
  overrideUrl,
  name,
  isUserPicture,
}: DisplayPictureProps) => {
  const { data, status } = useSession();

  const imageUrl = useMemo(() => {
    if (overrideUrl) {
      return overrideUrl;
    } else if (overrideFile) {
      return URL.createObjectURL(overrideFile);
    } else if (isUserPicture) {
      return data?.displayPicture;
    }
  }, [data?.displayPicture, overrideUrl, overrideFile, isUserPicture]);

  const userName = useMemo(() => {
    if (!imageUrl) {
      return (
        name ||
        (data && isUserPicture && `${data?.firstName} ${data?.lastName}`)
      );
    }
  }, [imageUrl, data, name, data, isUserPicture]);

  if (!imageUrl && !userName) {
    return null;
  }

  return (
    <WrapItem>
      <ChakraAvatar size={size || "2xl"} src={imageUrl} name={userName || ""} />
    </WrapItem>
  );
};
