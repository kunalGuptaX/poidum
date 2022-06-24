import { Box } from "@chakra-ui/react";
import { AtomicBlockUtils, EditorState, Entity } from "draft-js";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsCamera } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { getBase64 } from "../../../lib/common/helpers/getBase64";
import { VALID_IMAGE_TYPES } from "../../../lib/constants";
import { useEditor } from "../Editor";
import { insertImage } from "../helpers";

const ImageUploadButton = () => {
  const { editorState, onChangeEditorState } = useEditor();
  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone({
    accept: { "image/png": VALID_IMAGE_TYPES },
    maxFiles: 10,
  });

  const uploadImage = async () => {
    const newState = await insertImage(editorState, acceptedFiles[0]);
    if (newState) {
      onChangeEditorState(newState);
    }
  };

  useEffect(() => {
    if (acceptedFiles?.[0]) {
      uploadImage();
    }
  }, [acceptedFiles]);

  return (
    <div>
      <Box
        cursor="pointer"
        {...getRootProps({ className: "dropzone" })}
        border="1px solid rgba(0,0,0,.68)"
        borderRadius="50%"
        width="fit-content"
        padding="5px"
        paddingBottom="6px"
      >
        <IoCameraOutline size={22} color="rgba(0,0,0,.68)" />
        <input {...getInputProps()} />
      </Box>
      {/* {uploadedBanner ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={URL.createObjectURL(uploadedBanner)}
          width="auto"
          height="auto"
          alt="test"
        />
      ) : (
        <p>Drag or click to upload Banner Image</p>
      )} */}
    </div>
  );
};

export default ImageUploadButton;
