import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getCsrfToken, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Authentication from "../lib/Authentication/Authentication";
import { useAuth } from "../lib/Authentication/AuthProvider";

type Props = {
  csrfToken: string | null;
  session: Session | null;
};

const Signup = ({ csrfToken, session }: Props) => {
  const router = useRouter();
  const { openSignUpModal, isModalOpen } = useAuth();

  useEffect(() => {
    if (session?.accessToken) {
      router.push("/");
    } else if (!isModalOpen) {
      openSignUpModal();
    }
  }, [session, router, openSignUpModal, isModalOpen]);

  return <></>;
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
