import {
  Box,
  Divider,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import DisplayPicture from "../components/DisplayPicture";
import { VALID_IMAGE_TYPES } from "../lib/constants";
type Props = {
  session: Session;
};


const StyledEditable = styled(Editable)`
  font-size: 54px;
  line-height: 100%;
  font-family: "New York";
  font-weight: 600;
  text-align: center;
`;

const Post = ({ session }: Props) => {
  const [uploadedBanner, setUploadedBanner] = useState<File>();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": VALID_IMAGE_TYPES },
    maxFiles: 1,
  });

  useEffect(() => {
    if (acceptedFiles?.[0]) {
      setUploadedBanner(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Box padding="52px 0">
      <Box maxWidth="858px" width="100%" margin="auto">
        <StyledEditable
          defaultValue="A few words about this blog platform, Ghost, and how this site was made"
          placeholder="Enter Title here..."
        >
          <EditablePreview />
          <EditableTextarea rows={3} overflow="hidden" resize="none" />
        </StyledEditable>
        <Box maxWidth="626px" margin="32px auto" textAlign="center">
          <Editable
            defaultValue="Why Ghost (& Figma) instead of Medium, WordPress or other options?"
            fontSize="20px"
            lineHeight="100%"
            placeholder="Enter Subtitle here..."
            fontFamily="SF Mono"
            fontWeight={400}
            margin="auto"
          >
            <EditablePreview textAlign="center" />
            <EditableTextarea
              rows={2}
              textAlign="center"
              overflow="hidden"
              resize="none"
            />
          </Editable>
        </Box>
      </Box>
      <Box
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
      </Box>
      <Box padding="24px 20px">
        <Divider
          maxWidth="640px"
          margin="auto"
          borderColor="#000"
          borderWidth="2px"
        />
      </Box>
      <Box
        maxWidth="640px"
        margin="auto"
        fontFamily="SF Pro"
        fontWeight={700}
        textTransform="uppercase"
      >
        <Flex>
          <Box marginRight="16px">
            <DisplayPicture size="md" />
          </Box>
          <Box>{`${session?.firstName} ${session.lastName}`}</Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Post;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
}
