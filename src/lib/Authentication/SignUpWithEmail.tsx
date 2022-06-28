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
import { PrimaryButton } from "../../atoms/Button";
import { useAuth } from "./AuthProvider";
import { IoChevronBackSharp } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
const SignUpWithEmail = () => {
  const { openSignUpModal } = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await signIn("credentials", {
        ...values,
        newUser: true,
        redirect: true,
        callbackUrl: "/",
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3} width="fit-content" margin="0 auto">
        <Text maxWidth="316px" margin="0 auto" textAlign="center">
          Enter your email address to create an account.
        </Text>
      </Stack>
      <Stack
        width="270px"
        direction="row"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        marginTop="20px"
        spacing={4}
      >
        <Flex direction="column">
          <FormLabel fontSize="12px">First name</FormLabel>
          <Input
            value={formik.values.firstName}
            name="firstName"
            onChange={formik.handleChange}
            focusBorderColor="#000"
            variant="flushed"
            textAlign="center"
          />
        </Flex>
        <Flex direction="column">
          <FormLabel fontSize="12px">Last name</FormLabel>
          <Input
            value={formik.values.lastName}
            name="lastName"
            onChange={formik.handleChange}
            focusBorderColor="#000"
            variant="flushed"
            textAlign="center"
          />
        </Flex>
      </Stack>
      <Flex width="270px" margin="0 auto" direction="column" marginTop="20px">
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
      <Flex width="270px" margin="0 auto" direction="column" marginTop="20px">
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
          onClick={openSignUpModal}
          fontSize="14px"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IoChevronBackSharp />
            <span>All sign up options</span>
          </Stack>
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpWithEmail;
