import { Box, Collapse, IconButton, Slide, SlideFade } from "@chakra-ui/react";
import { AtomicBlockUtils, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineMore } from "react-icons/ai";
import { VALID_IMAGE_TYPES } from "../../constants";
import { TOOLBAR_DEFAULT_LEFT, TOOLBAR_DEFAULT_TOP } from "../constants";
import { useEditor } from "../Editor";
import { getEditorContainerPosition } from "../helpers";
import ImageUploadButton from "./ImageUploadButton";

type Props = {
  top: number | null;
};

const BlockFormattingToolbar = ({ top }: Props) => {
  const [openLeftMenu, setOpenLeftMenu] = useState(false);

  const closeMenuEventListener = (e: any) => {
    if (!e.path.some((p: any) => p.id === "entity-menu-container")) {
      setOpenLeftMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenuEventListener);
    return () => document.removeEventListener("click", closeMenuEventListener);
  }, []);

  return (
    <Box
      style={{
        top: (top ? top - 4 : -4),
        left:-60,
      }}
      hidden={!top === null}
      position="absolute"
      zIndex={20}
      backgroundColor="white"
      display="flex"
      alignItems="center"
      id="entity-menu-container"
      width={openLeftMenu ? "100%" : "fit-content"}
    >
      <IconButton
        aria-label="More"
        onClick={() => setOpenLeftMenu(!openLeftMenu)}
        icon={<AiOutlineMore size={24} />}
        variant="ghost"
        borderRadius="50%"
      />

      <SlideFade in={openLeftMenu} unmountOnExit>
        <Box color="white" rounded="md" padding="0 18px" width="100%">
          <ImageUploadButton />
        </Box>
      </SlideFade>

      {/* <Box
        backgroundColor="#f3f3f3"
        width="100%"
        maxHeight="fit-content"
        minHeight="235px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        userSelect="none"
        position="relative"
        color="#bdbdbd"
        border="1px dashed #eeeeee"
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        {uploadedBanner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={URL.createObjectURL(uploadedBanner)}
            width="auto"
            height="auto"
            alt="test"
          />
        ) : (
          <p>Drag or click to upload Banner Image</p>
        )}
      </Box> */}
    </Box>
  );
};

export default BlockFormattingToolbar;
