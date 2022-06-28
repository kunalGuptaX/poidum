import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { PrimaryButton, SecondaryButton } from "../../atoms/Button";
import { Modal } from "../../atoms/Modal";
import { useAuth } from "./AuthProvider";
import { IoChevronBackSharp } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
const SigninWithEmail = () => {
  const { openSignInModal } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const user = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3} width="fit-content" margin="0 auto">
        <Text maxWidth="316px" margin="0 auto" textAlign="center">
          Enter the email address associated with your account, and we’ll send a
          magic link to your inbox.
        </Text>
      </Stack>
      <Flex width="270px" margin="0 auto" direction="column" marginTop="50px">
        <FormLabel fontSize="12px">Your email</FormLabel>
        <Input
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          focusBorderColor="#000"
          variant="flushed"
          textAlign="center"
        />
      </Flex>
      <Flex width="270px" margin="0 auto" direction="column" marginTop="50px">
        <FormLabel fontSize="12px">Password</FormLabel>
        <Input
          value={formik.values.password}
          name="password"
          onChange={formik.handleChange}
          focusBorderColor="#000"
          variant="flushed"
          textAlign="center"
          type="password"
        />
      </Flex>
      <Stack
        direction="column"
        spacing={6}
        margin="auto"
        alignItems="center"
        justifyContent="center"
        marginTop="40px"
        marginBottom="100px"
      >
        <PrimaryButton width="226px" type="submit">
          Continue
        </PrimaryButton>

        <Button
          variant="link"
          fontWeight={400}
          onClick={openSignInModal}
          fontSize="14px"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IoChevronBackSharp />
            <span>All sign in options</span>
          </Stack>
        </Button>
      </Stack>
    </form>
  );
};

export default SigninWithEmail;
