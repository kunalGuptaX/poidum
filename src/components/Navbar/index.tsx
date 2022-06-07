import { Avatar, chakra, Flex, WrapItem } from "@chakra-ui/react";
import React from "react";

type Props = {};

const NavLinkContainer = chakra(Flex, {
  baseStyle: {
    fontFamily: "'Merriweather', serif",
    fontWeight: 500,
    fontSize: "20px",
    textTransform: "uppercase",
    height: "100%",
    alignItems: "center",
    paddingTop: "20px",
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
  console.log(session);
  return (
    <Flex
      height="132px"
      alignItems="center"
      justifyContent="space-between"
      padding="0 60px"
    >
      <Flex alignItems="center">
        {session ? <WrapItem>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </WrapItem> : null}
        Kunal Gupta
      </Flex>
      <Flex height="100%" alignItems="center">
        <NavbarLinks selected>Blog</NavbarLinks>
        <NavbarLinks>About</NavbarLinks>
        <NavbarLinks>Links</NavbarLinks>
        <NavbarLinks>Projects</NavbarLinks>
      </Flex>
    </Flex>
  );
};

export default Navbar;
