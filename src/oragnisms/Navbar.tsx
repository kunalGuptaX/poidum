import {
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { MdAccountCircle, MdArticle, MdLogout } from "react-icons/md";
import { useMediaQuery } from "@chakra-ui/react";

import { Session } from "next-auth";
import { PrimaryButton } from "../atoms/Button";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import Link from "next/link";
import { useAuth } from "../lib/Authentication/AuthProvider";
import { DisplayPicture, Logo } from "../atoms";
type Props = {
  session: Session;
};

const NavLinkContainer = chakra(Flex, {
  baseStyle: {
    fontFamily: "Noto Sans JP",
    fontWeight: 400,
    fontSize: "14px",
    height: "100%",
    alignItems: "center",
    color: "#000",
    cursor: "pointer",
  },
});

interface NavbarLinks {
  children: React.ReactNode;
  selected?: boolean;
  href?: string;
}

const NavbarLinks = ({ children, selected, href }: NavbarLinks) => {
  return (
    <NavLinkContainer
      height="100%"
      margin="0 15px"
      textDecoration={selected ? "underline" : "none"}
    >
      <Link href={href || "/"}>{children}</Link>
    </NavLinkContainer>
  );
};

const Navbar = ({ session }: Props) => {
  const { openSignUpModal, openSignInModal } = useAuth();
  const [isSmallerThan728] = useMediaQuery("(max-width: 728px)", {
    ssr: true,
  });

  const [isSmallerThan552] = useMediaQuery("(max-width: 552px)", {
    ssr: true,
  });

  const router = useRouter();
  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      padding="25px 0"
      boxShadow="0px 1px 0px rgba(0, 0, 0)"
      backgroundColor="white"
      zIndex={20}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxWidth="1192px"
        margin={isSmallerThan728 ? "0 24px" : "auto"}
      >
        <Link href="/">
          <Flex alignItems="center" fontFamily="Spectral" fontSize={64} cursor="pointer">
            <Image src="/images/PodiumLogo.svg" width="160" height={24.57} />
          </Flex>
        </Link>
        <Box height="25px">
          <Flex height="100%" alignItems="center">
            {!isSmallerThan728 ? (
              <>
                <NavbarLinks selected={router.asPath === "/"}>Blog</NavbarLinks>
                <NavbarLinks selected={router.asPath === "/about"}>
                  Membership
                </NavbarLinks>
                <NavbarLinks selected={router.asPath === "/links"}>
                  Write
                </NavbarLinks>
              </>
            ) : null}
            {!isSmallerThan552 ? (
              <NavLinkContainer
                selected={router.asPath === "/signin"}
                // href="/signin"
                onClick={() => openSignInModal()}
              >
                Sign in
              </NavLinkContainer>
            ) : null}
            {session ? (
              <Flex marginLeft="24px" alignItems="center">
                <IconButton
                  onClick={() => router.push("/post")}
                  aria-label="New"
                  variant="ghost"
                >
                  <TbEdit size={28} />
                </IconButton>
                <Menu>
                  <MenuButton as={Button} variant="link">
                    <Box>
                      <DisplayPicture size="md" isUserPicture />
                    </Box>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      minH="48px"
                      onClick={() => router.push("/profile")}
                    >
                      <MdAccountCircle
                        size="2rem"
                        style={{ marginRight: "12px" }}
                      />
                      <span>Profile</span>
                    </MenuItem>
                    <MenuItem
                      minH="48px"
                      onClick={() => router.push("/myPosts")}
                    >
                      <MdArticle size="2rem" style={{ marginRight: "12px" }} />
                      <span>My Posts</span>
                    </MenuItem>
                    <MenuItem
                      minH="40px"
                      onClick={() =>
                        signOut({
                          redirect: true,
                          callbackUrl: "/",
                        })
                      }
                    >
                      <MdLogout size="2rem" style={{ marginRight: "12px" }} />
                      <span>Sign out</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <Stack
                direction="row"
                spacing={4}
                alignItems="center"
                justifyContent="center"
                marginLeft="24px"
              >
                <PrimaryButton
                  // onClick={() => router.push("/signup")}
                  onClick={() => openSignUpModal()}
                  variant="outline"
                >
                  Get started
                </PrimaryButton>
                {/* <SecondaryButton
                  onClick={() => router.push("/signup")}
                  variant="outline"
                >
                  Register
                </SecondaryButton> */}
              </Stack>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
