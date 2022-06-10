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
import { Editor, EditorState, convertFromRaw, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import axios from "axios";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";
import { PrimaryButton } from "../../components/Button";
import { dateRightNow } from "../../lib/common/helpers/datetime";
import DisplayPicture from "../../components/DisplayPicture";
import { getEditorSelectionTopPosition } from "../../lib/editor/helpers/selection";
import { VALID_IMAGE_TYPES } from "../../lib/constants";

type Props = {
  session: Session;
};

const StyledTitle = styled(Box)`
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

const Post = ({ post }: Props) => {
  const date = dateRightNow(new Date(post.createdAt));

  return (
    <Box padding="52px 0">
      <Box maxWidth="858px" width="100%" margin="auto">
        <StyledTitle>{post.title}</StyledTitle>
        <Box maxWidth="626px" margin="32px auto" textAlign="center">
          <Box
            textAlign="center"
            fontSize="20px"
            lineHeight="100%"
            placeholder="Enter Subtitle here..."
            fontFamily="SF Mono"
            fontWeight={400}
            margin="auto"
          >
            {post.subTitle}
          </Box>
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
      >
        {/* {post.banner && (
          <img src={post.banner} width="auto" height="auto" alt="test" />
        )} */}
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
            <DisplayPicture overrideUrl={post.user.displayPicture} size="md" />
          </Box>
          <Box>
            <Box
              fontFamily="SF Pro"
              fontWeight={700}
              textTransform="uppercase"
            >{`${post.user?.firstName} ${post.user.lastName}`}</Box>
            <Box>{date}</Box>
          </Box>
        </Flex>
        <Box
          marginTop="56px"
          fontSize="20px"
          fontFamily="New York"
          position="relative"
        >
          {post.body}
        </Box>
      </Box>
    </Box>
  );
};

export default Post;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let post;
  let user;
  if (context.params?.id) {
    const res = await axios.get(
      `http://localhost:4000/api/posts/get/${context.params.id}`
    );
    post = res.data;

  }

  return {
    props: {
      post: post || null,
      user: user || {},
    },
  };
}
