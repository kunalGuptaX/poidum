import {
  Box,
  chakra,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { PrimaryButton, Button } from "../components/Button";

const StyledInput = chakra(Input, {
  baseStyle: {
    borderColor: "#000",
    borderRadius: "0",
    _focusVisible: {
      borderColor: "#000",
      borderRadius: "0",
      borderWidth: "1px",
      boxShadow: "0 0 0 1px #000",
    },
    _hover: {
      borderColor: "#000",
      borderWidth: "1.5px",
    },
    padding: "18px 12px",
    height: "auto",
    fontSize: "16px",
    color: "#000",
  },
});

const StyledLabel = chakra(FormLabel, {
  baseStyle: {
    fontSize: "16px",
    fontWeight: 500,
  },
});

const StyledHeading = chakra(Heading, {
  baseStyle: {
    fontFamily: "'New Yoirk', serif",
    fontWeight: 800,
    textAlign: "center",
  },
});

type Props = {
  csrfToken: string | null;
  session: Session | null;
};

const Signup = ({ csrfToken, session }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken) {
      router.push("/");
    }
  }, [session, router]);

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
    <Box padding="0 24px" width="100%">
      <Box
        maxWidth={640}
        padding="62px 50px"
        border="1px solid #000"
        borderTopWidth={12}
        margin="auto"
        marginTop="80px"
      >
        <form onSubmit={formik.handleSubmit}>
          <input
            name="csrfToken"
            type="hidden"
            defaultValue={csrfToken || ""}
          />
          <Stack spacing={3}>
            <StyledHeading>Create account</StyledHeading>
            <Stack direction="row" spacing={4}>
              <FormControl>
                <StyledLabel>First Name</StyledLabel>
                <StyledInput
                  id="firstName"
                  type="firstName"
                  placeholder="John"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <StyledLabel>Last Name</StyledLabel>
                <StyledInput
                  id="lastName"
                  type="lastName"
                  placeholder="Wick"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
            </Stack>

            <FormControl>
              <StyledLabel>Email address</StyledLabel>
              <StyledInput
                id="email"
                type="email"
                placeholder="johnwick@doe.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <StyledLabel>Password</StyledLabel>
              <StyledInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Stack>
          <Box
            marginTop={6}
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <span>
              Already have an account?{" "}
              <Button onClick={() => router.push("/signin")} variant="link">
                Sign in
              </Button>
            </span>
            <PrimaryButton type="submit">Sign up</PrimaryButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let csrfToken = null;
  let session = await getSession({ req: context.req });
  if (!session?.user) {
    csrfToken = (await getCsrfToken(context)) || null;
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      csrfToken,
      session,
    },
  };
}
