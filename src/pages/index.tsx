import axios from "axios";
import { convertFromRaw, convertToRaw } from "draft-js";
import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

const Home: NextPage = ({ posts }) => {
  console.log(posts);
  return posts?.map((post) => {
    const bodyText = convertFromRaw(JSON.parse(post.body)).getPlainText(
      "\u0001"
    );
    return (
      <div key={post.id}>
        <ArticleCard
          displayPicture={post.user.displayPicture}
          name={`${post.user.firstName} ${post.user.lastName}`}
          title={post.title}
          body={bodyText}
          data={new Date(post.createdAt)}
          id={post.id}
        />
      </div>
    );
  });
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let session = await getSession({ req: context.req });

  if (!session?.accessToken) {
    return {
      props: {},
    };
  }

  const res = await axios.get(`http://localhost:4000/api/posts/get/all`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });
  const posts = res.data;
  return {
    props: {
      posts: posts || null,
    },
  };
}

export default Home;
