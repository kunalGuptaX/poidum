import { Box } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import React from "react";
import { getSessionOnServer } from "../../../helpers/serverTools";
import { VerticalLayout } from "../../../layouts/Vertical";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {ArticleCard} from "../../../molecules/ArticleCard";
import { convertFromRaw } from "draft-js";

type Props = {
  session: Session;
};

const UserPage = ({ session, user, posts }: Props) => {
  console.log(posts);
  return (
    <VerticalLayout>
      <Box padding="52px 0">
        <Box maxWidth="692px" width="100%" margin="auto">
          <Box
            maxH="52px"
            lineHeight="52px"
            fontSize="42px"
            color="rgba(25, 25, 25, 1)"
            wordBreak="break-all"
            style={{
              "-webkit-line-clamp": "1",
            }}
            textOverflow="ellipsis"
            overflow="hidden"
            fontWeight={800}
            mb="40px"
          >
            {user.firstName} {user.lastName}
          </Box>
          <Tabs colorScheme="rgba(41, 41, 41, 1)">
            <TabList borderBottom="none" boxShadow="rgb(230 230 230) 0px -1px 0px inset">
              <Tab
                padding="4px 0 16px 0"
                fontSize="14px"
                fontWeight="400"
                color="rgba(41, 41, 41, 1)"
                paddingBottom="16px"
                borderBottom="1px solid rgba(41, 41, 41, 1)"
                marginBottom="0"
              >
                Home
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel padding="32px 0">
                {posts?.map((post: any) => {
                  const bodyText = convertFromRaw(
                    JSON.parse(post.body)
                  ).getPlainText("\u0001");
                  return (
                    <div key={post.id}>
                      <ArticleCard
                        displayPicture={post.user.displayPicture}
                        name={`${post.user.firstName} ${post.user.lastName}`}
                        title={post.title}
                        body={bodyText}
                        data={new Date(post.createdAt)}
                        id={post.id}
                        userId={post.user.id}
                      />
                    </div>
                  );
                })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </VerticalLayout>
  );
};

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let session = await getSessionOnServer(context.req);
  const userId = context.query.userId;
  const user = await axios.get(`http://localhost:4000/api/users/get/${userId}`);
  const res = await axios.get(
    `http://localhost:4000/api/posts/get/byuser/${userId}`
  );
  const posts = res.data;
  if (!user.data) {
    return {
      props: {},
    };
  }

  return {
    props: {
      session,
      user: user.data,
      posts,
    },
  };
}
