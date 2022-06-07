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
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PrimaryButton, Button } from "../components/Button";
import axios from "axios";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

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

const Signin = ({ csrfToken, session }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken) {
      router.push("/");
    }
  }, [session, router]);

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
        callbackUrl: '/'

      });
    },
  });
  return (
    <Box
      maxWidth={640}
      padding="62px 50px"
      border="1px solid #000"
      borderTopWidth={12}
      margin="auto"
      marginTop="80px"
    >
      <form onSubmit={formik.handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || ""} />
        <Stack spacing={3}>
          <StyledHeading>Sign in</StyledHeading>
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
            New here?{" "}
            <Button onClick={() => router.push("/signup")} variant="link">
              Create account
            </Button>
          </span>
          <PrimaryButton type="submit">Sign in</PrimaryButton>
        </Box>
      </form>
    </Box>
  );
};

export default Signin;

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
