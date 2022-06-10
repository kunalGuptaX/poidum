import "draft-js/dist/Draft.css";
import {
  Box,
  Divider,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import DisplayPicture from "../components/DisplayPicture";
import { VALID_IMAGE_TYPES } from "../lib/constants";
import { Editor, EditorState, convertFromRaw, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import axios from "axios";
import { PrimaryButton } from "../components/Button";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";
import { getEditorSelectionTopPosition } from "../lib/editor/helpers/selection";
import { dateRightNow } from "../lib/common/helpers/datetime";

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

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
});

const TOOLBAR_DEFAULT_LEFT = -150;
const TOOLBAR_DEFAULT_TOP = -10;

const Post = ({ session }: Props) => {
  const [uploadedBanner, setUploadedBanner] = useState<File>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(emptyContentState)
  );
  const [cursorPos, setCursorPos] = useState<any>({
    top: TOOLBAR_DEFAULT_TOP,
    left: TOOLBAR_DEFAULT_LEFT,
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": VALID_IMAGE_TYPES },
    maxFiles: 1,
  });

  const editorRef = useRef<Editor>(null);

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
        if (editorState.getCurrentContent().getPlainText("\u0001")?.length) {
          const res = await axios.post("/api/posts/newPost", {
            title: values.title,
            subTitle: values.subTitle,
            body: editorState.getCurrentContent().getPlainText("\u0001"),
          });
          console.log(res)
        }
      } catch (er) {
        console.log(er);
      }
    },
  });


  useEffect(() => {
    const editorSelectionTopPosition =
      getEditorSelectionTopPosition(editorState);
    if (editorSelectionTopPosition !== null) {
      setCursorPos({
        top: editorSelectionTopPosition + TOOLBAR_DEFAULT_TOP,
        left: TOOLBAR_DEFAULT_LEFT,
      });
    }
  }, [editorState]);

  useEffect(() => {
    if (acceptedFiles?.[0]) {
      setUploadedBanner(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Box padding="52px 0">
      <form onSubmit={formik.handleSubmit}>
        <Box maxWidth="858px" width="100%" margin="auto">
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
        </Box>
        <Box maxWidth="640px" margin="auto">
          <Flex alignItems="center">
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
          </Flex>
          <Box
            marginTop="56px"
            fontSize="20px"
            fontFamily="New York"
            position="relative"
          >
            <Editor
              placeholder="Start typing here..."
              editorState={editorState}
              onChange={setEditorState}
              ref={editorRef}
              // handleKeyCommand={handleKeyCommand}
            />
            {cursorPos ? (
              <div
                style={{
                  position: "absolute",
                  top: cursorPos?.top,
                  left: cursorPos?.left,
                  zIndex: 20,
                }}
              >
                <IconButton
                  aria-label="Search database"
                  variant="ghost"
                  icon={<AiOutlineBold />}
                  borderRadius={0}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setEditorState(
                      RichUtils.toggleInlineStyle(editorState, "BOLD")
                    );
                    editorRef.current?.focus();
                  }}
                />
                <IconButton
                  aria-label="Search database"
                  variant="ghost"
                  icon={<AiOutlineItalic />}
                  borderRadius={0}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setEditorState(
                      RichUtils.toggleInlineStyle(editorState, "ITALIC")
                    );
                    editorRef.current?.focus();
                  }}
                />
                <IconButton
                  aria-label="Search database"
                  variant="ghost"
                  icon={<AiOutlineUnderline />}
                  borderRadius={0}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setEditorState(
                      RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
                    );
                    editorRef.current?.focus();
                  }}
                />
              </div>
            ) : null}
          </Box>
        </Box>
        <PrimaryButton
          type="submit"
          style={{ position: "fixed", bottom: "20px", right: "200px" }}
        >
          Submit
        </PrimaryButton>
      </form>
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
