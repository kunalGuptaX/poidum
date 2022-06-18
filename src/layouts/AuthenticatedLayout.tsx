import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import AuthenticatedNavbarItems from "../components/Navbar/AuthenticatedNavbarItems";
import IsolatedNavbar from "../components/Navbar/IsolatedNavbar";

type Props = {
  middleContent: React.ReactNode;
};

const AuthenticatedLayout = ({ middleContent }: Props) => {
  const router = useRouter();
  const [isSmallerThan1080] = useMediaQuery("(max-width: 1080px)", {
    ssr: true,
  });

  if (router.asPath.includes("/new-post")) {
    return <>{middleContent}</>;
  }
  return (
    <div style={{ maxWidth: "1504px", margin: "auto", position: "relative" }}>
      <div
        style={{
          display: "flex",
        }}
      >
        <Flex
          borderRight="1px solid rgba(230, 230, 230, 1)"
          justifyContent="space-between"
          alignItems="center"
          {...(isSmallerThan1080
            ? {
                direction: "row",
                position: "fixed",
                bottom: 0,
                boxShadow: "0px 2px 10px rgb(0 0 0 / 15%)",
                height: "56px",
                width: "100%",
              }
            : {
                direction: "column",
                width: "88px",
                height: "100vh",
              })}
        >
          {!isSmallerThan1080 ? (
            <Box padding="40px 0">
              <Image src="/images/LogoSmall.svg" width="100%" height={23} />
            </Box>
          ) : null}
          <AuthenticatedNavbarItems
            direction={isSmallerThan1080 ? "row" : "column"}
          />
        </Flex>
        <Box
          {...(isSmallerThan1080 ? { marginTop: "56px" } : {})}
          height="100vh"
          overflow="auto"
          width="100%"
        >
          {middleContent}
        </Box>
        {isSmallerThan1080 ? (
          <Flex
            position="fixed"
            top="0"
            width="100%"
            height="56px"
            backgroundColor="white"
            alignItems="center"
            boxShadow="0px -2px 10px rgb(0 0 0 / 15%)"
          >
            <Box>
              <Image src="/images/LogoSmall.svg" width="100%" height={23} />
            </Box>
          </Flex>
        ) : null}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
