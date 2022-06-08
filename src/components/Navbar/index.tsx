import {
  Box,
  Button,
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { useMediaQuery } from "@chakra-ui/react";

import DisplayPicture from "../DisplayPicture";
import { Session } from "next-auth";
import { PrimaryButton, SecondaryButton } from "../Button";
type Props = {
  session: Session;
};

const NavLinkContainer = chakra(Flex, {
  baseStyle: {
    fontFamily: "'New York', serif",
    fontWeight: 500,
    fontSize: "20px",
    textTransform: "uppercase",
    height: "100%",
    alignItems: "center",
    paddingTop: "20px",
    letterSpacing: "0.12em",
  },
});

interface NavbarLinks {
  children: React.ReactNode;
  selected?: boolean;
}

const NavbarLinks = ({ children, selected }: NavbarLinks) => {
  return (
    <NavLinkContainer
      height="100%"
      margin="0 15px"
      borderBottom={selected ? `2px solid #000` : ""}
      paddingTop={selected ? "22px" : "20px"}
    >
      {children}
    </NavLinkContainer>
  );
};

const Navbar = ({ session }: Props) => {
  const [isSmallerThan900] = useMediaQuery("(max-width: 850px)", {
    ssr: true,
  });

  const router = useRouter();
  return (
    <Flex
      height="132px"
      alignItems="center"
      justifyContent="space-between"
      padding="0 60px"
      boxShadow="0px 1px 0px rgba(0, 0, 0, 0.16)"
    >
      <Flex alignItems="center" fontFamily="Spectral" fontSize={64}>
        Blog
      </Flex>
      {isSmallerThan900 ? (
        <Menu>
          <MenuButton as={Button} variant="link">
            <GrMenu size="2rem" />
          </MenuButton>
          <MenuList>
            <MenuItem minH="40px">
              <span>Blog</span>
            </MenuItem>
            {session ? (
              <>
                <MenuItem onClick={() => router.push("/profile")} minH="2rem">
                  <Box height="2rem" marginRight="12px">
                    <DisplayPicture size="sm" />
                  </Box>
                  <span>Profile</span>
                </MenuItem>
                <MenuItem
                  minH="40px"
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: "/signin",
                    })
                  }
                >
                  <MdLogout size="2rem" style={{ marginRight: "12px" }} />
                  <span>Sign out</span>
                </MenuItem>
              </>
            ) : (
              <Stack
                direction="row"
                marginTop="20px"
                spacing={4}
                alignItems="center"
                justifyContent="center"
                margin="20px 24px"
              >
                <PrimaryButton
                  onClick={() => router.push("/signin")}
                  variant="outline"
                >
                  Sign in
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => router.push("/signup")}
                  variant="outline"
                >
                  Register
                </SecondaryButton>
              </Stack>
            )}
          </MenuList>
        </Menu>
      ) : (
        <Flex height="100%" alignItems="center">
          <NavbarLinks selected={router.asPath === "/"}>Blog</NavbarLinks>
          <NavbarLinks selected={router.asPath === "/about"}>About</NavbarLinks>
          <NavbarLinks selected={router.asPath === "/links"}>Links</NavbarLinks>
          <NavbarLinks selected={router.asPath === "/projects"}>
            Projects
          </NavbarLinks>
          {session ? (
            <Flex marginLeft="24px" alignItems="center">
              <PrimaryButton
                onClick={() => router.push("/post")}
                marginTop="20px"
                marginRight="24px"
              >
                Create Post
              </PrimaryButton>
              <Menu>
                <MenuButton as={Button} variant="link">
                  <Box paddingTop="20px">
                    <DisplayPicture size="md" />
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem minH="48px" onClick={() => router.push("/profile")}>
                    <MdAccountCircle
                      size="2rem"
                      style={{ marginRight: "12px" }}
                    />
                    <span>Profile</span>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() =>
                      signOut({
                        redirect: true,
                        callbackUrl: "/signin",
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
              marginTop="20px"
              spacing={4}
              alignItems="center"
              justifyContent="center"
              marginLeft="24px"
            >
              <PrimaryButton
                onClick={() => router.push("/signin")}
                variant="outline"
              >
                Sign in
              </PrimaryButton>
              <SecondaryButton
                onClick={() => router.push("/signup")}
                variant="outline"
              >
                Register
              </SecondaryButton>
            </Stack>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
