import {
  Box,
  Button,
  chakra,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import {  useRouter } from "next/router";
import React, { useEffect } from "react";
import { PrimaryButton } from "../components/Button";
import { Heading } from "../components/Heading";
import { LabeledInput } from "../components/Input/LabeledInput";

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
            <Heading>Create account</Heading>
            <Stack direction="row" spacing={4}>
              <LabeledInput
                label="First Name"
                id="firstName"
                type="firstName"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <LabeledInput
                label="Last Name"
                id="lastName"
                type="lastName"
                placeholder="Wick"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </Stack>
            <LabeledInput
              label="Email address"
              id="email"
              type="email"
              placeholder="johnwick@doe.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <LabeledInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
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
