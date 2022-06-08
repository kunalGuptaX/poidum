import { Box, Button, chakra, Heading, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PrimaryButton } from "../components/Button";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { LabeledInput } from "../components/Input/LabeledInput";

const StyledHeading = chakra(Heading, {
  baseStyle: {
    fontFamily: "'New York', serif",
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
            <StyledHeading>Sign in</StyledHeading>
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
              New here?{" "}
              <Button onClick={() => router.push("/signup")} variant="link">
                Create account
              </Button>
            </span>
            <PrimaryButton type="submit">Sign in</PrimaryButton>
          </Box>
        </form>
      </Box>
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
