import {
  Box,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import DisplayPicture from "../components/DisplayPicture";
import { VALID_IMAGE_TYPES } from "../lib/constants";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import axios from "axios";
import { PrimaryButton } from "../components/Button";
import { dateRightNow } from "../lib/common/helpers/datetime";
import Editor from "../components/Editor";
import IsolatedNavbar from "../components/Navbar/IsolatedNavbar";

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
  const [editorValue, setEditorValue] =
    useState<Draft.DraftModel.Encoding.RawDraftContentState>();

  const formik = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      banner: "",
      body: "",
      tags: [],
    },
    onSubmit: async (values) => {
      try {
        if (editorValue) {
          const res = await axios
            .post("/api/posts/newPost", {
              title: values.title,
              subTitle: values.subTitle || "test subtitle",
              body: JSON.stringify(editorValue),
            })
            .catch((er) => console.log(er));
          console.log(res);
        }
      } catch (er) {
        console.log(er);
      }
    },
  });

  useEffect(() => {
    if (acceptedFiles?.[0]) {
      setUploadedBanner(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const titleInputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (titleInputRef.current) {
      titleInputRef.current.style.height = "initial";
      titleInputRef.current.style.height =
        titleInputRef.current.scrollHeight + "px";
    }
    if (e.target.value.length < 237) {
      formik.handleChange(e);
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <IsolatedNavbar session={session} />
        <Box marginTop="62px" paddingTop="8px">
          {/* <Box maxWidth="858px" width="100%" margin="auto">
          <StyledEditable
            defaultValue="A few words about this blog platform, Ghost, and how this site was made"
            placeholder="Enter Title here..."
          >
            <EditablePreview />
            <EditableTextarea
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              rows={3}
              overflow="hidden"
              resize="none"
            />
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
                name="subTitle"
                value={formik.values.subTitle}
                onChange={formik.handleChange}
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
        </Box> */}
          <Box maxWidth="640px" margin="auto">
            <Editable placeholder="Title" marginBottom="20px">
              <EditablePreview
                fontSize="42px"
                fontFamily="charter"
                color={formik.values.title ? "black" : "#b3b3b1"}
                _placeholder={{ color: "#b3b3b1" }}
                overflow="hidden"
                width="100%"
              />
              <EditableTextarea
                border="none"
                _focusVisible={{
                  border: "none",
                }}
                paddingBottom="0"
                marginBottom="3px"
                fontSize="42px"
                fontFamily="charter"
                autoFocus
                id="title"
                rows={1}
                resize="none"
                overflow="hidden"
                onChange={handleInputChange}
                value={formik.values.title}
                _placeholder={{
                  color: "#b3b3b1",
                }}
                ref={titleInputRef}
              />
            </Editable>
            <Editor
              /**@ts-ignore */
              placeholder="Start typing here..."
              id="body"
              /**@ts-ignore */
              onChange={(e, value) => setEditorValue(value)}
              value={editorValue}
            />
            {/* <Flex alignItems="center">
            <Box marginRight="16px">
              <DisplayPicture size="md" />
            </Box>
            <Box>
              <Box
                fontFamily="SF Pro"
                fontWeight={700}
                textTransform="uppercase"
              >{`${session?.firstName} ${session.lastName}`}</Box>
              <Box>{dateRightNow()}</Box>
            </Box>
          </Flex> */}
            {/* <Box
            marginTop="56px"
            fontSize="20px"
            fontFamily="charter"
            position="relative"
          >

          </Box> */}
          </Box>

          {/* <PrimaryButton
          type="submit"
          style={{ position: "fixed", bottom: "20px", right: "200px" }}
        >
          Submit
        </PrimaryButton> */}
        </Box>
      </form>
    </>
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
