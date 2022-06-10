import { Box, Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";

type Props = {};

const MyPosts = (props: Props) => {
  const [posts, setPosts] = useState<any>(null);

  const getAllPosts = async () => {
    const res = await axios.get("/api/posts/getByUser");
    setPosts(res.data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);


  return (
    <div>
      {posts?.map((post: any) => {
        return (
          <Box key={post.id}>
            <Link href={`/article/${post.id}`}>
              <Box
                maxWidth={700}
                padding="12px"
                margin="12px"
                boxShadow="0px 0px 0px 1px rgba(0, 0, 0, 0.16)"
                cursor="pointer"
              >
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="start"
                  alignItems="start"
                >
                  <img src="https://picsum.photos/200/150" />
                  <Box>
                    <Heading size="md" textAlign="left">
                      {post.title}
                    </Heading>
                    <div>{post.subTitle}</div>
                  </Box>
                </Stack>
              </Box>
            </Link>
          </Box>
        );
      })}
    </div>
  );
};

export default MyPosts;
