import { Box, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { DisplayPicture, Text } from "../atoms";
import { dateRightNow } from "../helpers/datetime";
import { getPostUrl } from "../helpers/getPostUrl";

export interface ArticleCardProps {
  displayPicture: string;
  title: string;
  body: string;
  image?: string;
  name: string;
  date: Date;
  id: string;
  userId: string;
}

export const ArticleCard = ({
  displayPicture,
  title,
  body,
  image,
  name,
  date,
  id,
  userId,
}: ArticleCardProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [textHeight, setTextHeight] = useState(112);
  const [textLines, setTextLines] = useState(2);

  useEffect(() => {
    if (headerRef.current?.offsetHeight) {
      const height = 112 - headerRef.current.offsetHeight;
      setTextHeight(height);
      setTextLines(Math.trunc(height / 24));
    }
  }, [headerRef]);

  return (
    <Link href={getPostUrl(userId, id)}>
      <Box
        paddingBottom="32px"
        cursor="pointer"
        borderBottom="1px solid rgba(230, 230, 230, 1)"
      >
        <Box pt="24px" maxW="692px">
          <Stack spacing={2} direction="row" alignItems="center">
            <DisplayPicture overrideUrl={displayPicture} size="xs" />
            <Text size="sm">{name}</Text>
            <Text size="sm">·</Text>
            <Text size="sm" color="light">
              {dateRightNow(date)}
            </Text>
          </Stack>
          <Box mt="12px">
            <Stack spacing={8} direction="row">
              <Box width="100%">
                <Heading
                  variant="h2"
                  letterSpacing="0"
                  maxHeight="84px"
                  lineHeight="28px"
                  fontSize="22px"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  fontWeight={800}
                  pb="8px"
                  ref={headerRef}
                >
                  {title}
                </Heading>
                <Box>
                  <Text
                    maxH={textHeight + "px"}
                    fontFamily="charter"
                    textOverflow="ellipsis"
                    fontSize="16px"
                    lineHeight="24px"
                    overflow="hidden"
                    textLines={textLines}
                    style={{
                      /** @ts-ignore */
                      "-webkit-line-clamp": `${textLines}`,
                      "-webkit-box-orient": "vertical",
                      display: "-webkit-box",
                    }}
                  >
                    {body}
                  </Text>
                </Box>
              </Box>
              <Box width="142px">
                <Image
                  src={image || "/images/1_N7JuOgdQKlwdGL8qG9rEUw.png"}
                  alt="img"
                  height="112px"
                  width="112px"
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
