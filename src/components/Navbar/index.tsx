import {
  Avatar,
  Box,
  chakra,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  WrapItem,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { useMediaQuery } from "@chakra-ui/react";

import { Button, PrimaryButton } from "../Button";
type Props = {};

const NavLinkContainer = chakra(Flex, {
  baseStyle: {
    fontFamily: "'New Yoirk', serif",
    fontWeight: 500,
    fontSize: "20px",
    textTransform: "uppercase",
    height: "100%",
    alignItems: "center",
    paddingTop: "20px",
    letterSpacing: "0.12em",
  },
});

const SigninButton = chakra(Button, {
  baseStyle: {
    borderColor: "#000",
    borderRadius: "0",
  },
});

const RegisterButton = chakra(PrimaryButton, {
  baseStyle: {
    textTransform: "none",
    fontSize: "16px",
    padding: "0 16px",
    height: "42px",
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
  const [isSmallerThan900] = useMediaQuery("(max-width: 850px)");

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
            <MenuItem
              minH="40px"
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/signin",
                })
              }
            >
              <span>Blog</span>
            </MenuItem>
            {session ? (
              <>
                <MenuItem minH="2rem">
                  <WrapItem height="2rem" marginRight="12px">
                    <Avatar
                      w="100%"
                      h="100%"
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
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
                <SigninButton
                  onClick={() => router.push("/signin")}
                  variant="outline"
                >
                  Sign in
                </SigninButton>
                <RegisterButton
                  onClick={() => router.push("/signup")}
                  variant="outline"
                >
                  Register
                </RegisterButton>
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
            <Box marginLeft="24px">
              <Menu>
                <MenuButton as={Button} variant="link">
                  <WrapItem paddingTop="20px">
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </MenuButton>
                <MenuList>
                  <MenuItem minH="48px">
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
            </Box>
          ) : (
            <Stack
              direction="row"
              marginTop="20px"
              spacing={4}
              alignItems="center"
              justifyContent="center"
              marginLeft="24px"
            >
              <SigninButton
                onClick={() => router.push("/signin")}
                variant="outline"
              >
                Sign in
              </SigninButton>
              <RegisterButton
                onClick={() => router.push("/signup")}
                variant="outline"
              >
                Register
              </RegisterButton>
            </Stack>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
