import { Box, Button, chakra, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PrimaryButton } from "../atoms/Button";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { LabeledInput } from "../atoms/Input/LabeledInput";
import { Heading } from "../atoms/Heading";
import Authentication from "../lib/Authentication/Authentication";
import { useAuth } from "../lib/Authentication/AuthProvider";

type Props = {
  csrfToken: string | null;
  session: Session | null;
};

const Signin = ({ csrfToken, session }: Props) => {
  const router = useRouter();
  const { openSignInModal, isModalOpen } = useAuth();
  useEffect(() => {
    if (session?.accessToken) {
      router.push("/");
    } else if (!isModalOpen) {
      openSignInModal();
    }
  }, [session, router, openSignInModal, isModalOpen]);

  return <></>;
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
