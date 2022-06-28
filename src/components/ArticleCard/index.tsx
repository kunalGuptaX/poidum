import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { dateRightNow } from "../../lib/common/helpers/datetime";
import DisplayPicture from "../DisplayPicture";

type Props = {};

const ArticleCard = ({
  displayPicture,
  title,
  body,
  image,
  name,
  date,
  id,
  userId
}: Props) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [textHeight, setTextHeight] = useState(112);
  const [textLines, setTextLines] = useState(2);
  const headerHeight = headerRef.current?.offsetHeight;

  useEffect(() => {
    if (headerRef.current?.offsetHeight) {
      const height = 112 - headerRef.current.offsetHeight;
      setTextHeight(height);
      setTextLines(Math.trunc(height / 24));
    }
  }, [headerRef]);

  return (
    <Link href={`/p/${userId}/${id}`}>
      <Box
        paddingBottom="32px"
        cursor="pointer"
        borderBottom="1px solid rgba(230, 230, 230, 1)"
      >
        <Box pt="24px" maxW="692px">
          <Stack spacing={2} direction="row" alignItems="center">
            <DisplayPicture overrideUrl={displayPicture} size="xs" />
            <Text fontSize="14px" color="rgba(41, 41, 41, 1)">
              {name}
            </Text>
            <Text>·</Text>
            <Text color="rgba(117, 117, 117, 1)" fontSize="14px">
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
                    color="rgba(41, 41, 41, 1)"
                    style={{
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
                <img
                  src={image || "/images/1_N7JuOgdQKlwdGL8qG9rEUw.png"}
                  alt="img"
                  style={{
                    height: "112px",
                    width: "auto",
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ArticleCard;
