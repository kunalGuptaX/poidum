/* eslint-disable @next/next/no-css-tags */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { getSession, SessionProvider } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import App from "next/app";
import Navbar from "../components/Navbar";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps,
  session,
}: AppProps & { session: Session }) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Navbar session={session} />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

/* @ts-ignore */
MyApp.getInitialProps = async (context: any) => {
  const appProps: any = await App.getInitialProps(context);
  const session = await getSession(context);

  // ----------> returns null
  console.log(session);

  return {
    ...appProps,
    session,
  };
};

export default MyApp;
