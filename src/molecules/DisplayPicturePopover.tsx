import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import React from "react";
import { DisplayPicture, DisplayPictureProps } from "../atoms";

export interface DisplayPicturePopoverProps extends DisplayPictureProps {
  children: React.ReactNode;
}

export const DisplayPicturePopover = ({
  children,
  ...props
}: DisplayPicturePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" padding="0" borderRadius="50%">
          <DisplayPicture {...props} />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="fit-content">
        <PopoverArrow />
        <PopoverBody
          padding="0"
          width="fit-content"
          overflow="auto"
          maxHeight="100vh"
        >
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DisplayPicture;
