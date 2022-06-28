import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import styled from "styled-components";
import "draft-js/dist/Draft.css";
import axios from "axios";
import { dateRightNow } from "../../../../lib/common/helpers/datetime";
import DisplayPicture from "../../../../components/DisplayPicture";
import { convertFromRaw, EditorState } from "draft-js";
import Editor from "../../../../components/Editor";
import { VerticalLayout } from "../../../../layouts/Vertical";

type Props = {
  post: any;
};

const StyledTitle = styled(Text)`
  font-weight: 800;
  letter-spacing: -0.016em;
  line-height: 40px;
  margin-top: 0.6em;
  font-size: 32px;
`;

const Post = ({ post }: Props) => {
  const date = dateRightNow(new Date(post.createdAt));
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(post.body))
  );

  return (
    <VerticalLayout>
      <Box padding="52px 0">
        <Box maxWidth="692px" width="100%" margin="auto">
          <Flex alignItems="center" marginBottom="32px">
            <Box marginRight="16px">
              <DisplayPicture
                overrideUrl={post.user.displayPicture}
                size="md"
              />
            </Box>
            <Stack spacing={1}>
              <Box fontFamily="SF Pro">{`${post.user?.firstName} ${post.user.lastName}`}</Box>
              <Box
                color="rgba(117, 117, 117, 1)"
                lineHeight="20px"
                fontSize="14px"
              >
                {date.split(",")[0]}
              </Box>
            </Stack>
          </Flex>
          <StyledTitle>{post.title}</StyledTitle>
        </Box>
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
      > */}
        {/* {post.banner && (
          <img src={post.banner} width="auto" height="auto" alt="test" />
        )} */}
        {/* </Box> */}
        {/* <Box padding="24px 20px">
        <Divider
          maxWidth="640px"
          margin="auto"
          borderColor="#000"
          borderWidth="2px"
        />
      </Box> */}
        <Box maxWidth="692px" margin="auto">
          <Box
            marginTop="56px"
            fontSize="20px"
            fontFamily="charter"
            position="relative"
          >
            <Editor readOnly editorState={editorState} />
          </Box>
        </Box>
      </Box>
    </VerticalLayout>
  );
};

export default Post;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let post;
  let user;
  if (context.query?.postId) {
    const res = await axios.get(
      `http://localhost:4000/api/posts/get/${context.query.postId}`
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
