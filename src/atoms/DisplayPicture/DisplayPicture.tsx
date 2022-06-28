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
}

export const DisplayPicture = ({
  size,
  overrideFile,
  overrideUrl,
}: DisplayPictureProps) => {
  const { data, status } = useSession();

  const imageUrl = useMemo(() => {
    if (overrideUrl) {
      return overrideUrl;
    } else if (overrideFile) {
      return URL.createObjectURL(overrideFile);
    } else {
      return data?.displayPicture;
    }
  }, [data?.displayPicture, overrideUrl, overrideFile]);

  const name = useMemo(() => {
    if (!imageUrl) {
      return `${data?.firstName} ${data?.lastName}`;
    }
  }, [imageUrl, data]);

  if (!overrideUrl && (status === "loading" || !data)) {
    return null;
  }

  return (
    <WrapItem>
      <ChakraAvatar size={size || "2xl"} src={imageUrl} name={name} />
    </WrapItem>
  );
};
