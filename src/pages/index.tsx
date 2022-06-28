import { Box } from "@chakra-ui/react";
import axios from "axios";
import { convertFromRaw, convertToRaw } from "draft-js";
import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import {ArticleCard} from "../molecules/ArticleCard";
import { HorizontalLayout } from "../layouts/Horizontal";
import { VerticalLayout } from "../layouts/Vertical";

const Home: NextPage = ({ posts, session }) => {
  const Layout: any = session?.accessToken ? VerticalLayout : HorizontalLayout;
  return (
    <Layout>
      {posts?.map((post: any) => {
        const bodyText = convertFromRaw(JSON.parse(post.body)).getPlainText(
          "\u0001"
        );
        return (
          <Box margin="0 auto" key={post.id} width="fit-content">
            <ArticleCard
              displayPicture={post.user.displayPicture}
              name={`${post.user.firstName} ${post.user.lastName}`}
              title={post.title}
              body={bodyText}
              data={new Date(post.createdAt)}
              id={post.id}
            />
          </Box>
        );
      })}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let session = await getSession({ req: context.req });
  const res = await axios.get(`http://localhost:4000/api/posts/get/all`);
  const posts = res.data;
  return {
    props: {
      session: session || null,
      posts: posts || null,
    },
  };
}

export default Home;
