/* eslint-disable @next/next/no-css-tags */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, ChakraTheme, extendTheme } from "@chakra-ui/react";
import { getSession, SessionProvider } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import App from "next/app";
import Navbar from "../components/Navbar";
import { Session } from "next-auth";
import { theme } from "../styles/theme";
import AuthProvider from "../lib/Authentication/AuthProvider";
import Authentication from "../lib/Authentication/Authentication";

function MyApp({
  Component,
  pageProps,
  session,
}: AppProps & { session: Session }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="/stylesheet.css" />
      </Head>
      <ChakraProvider theme={theme}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <AuthProvider>
            <Authentication />
            <Navbar session={session} />
            <Component {...pageProps} />
          </AuthProvider>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}

/* @ts-ignore */
MyApp.getInitialProps = async (context: any) => {
  const appProps: any = await App.getInitialProps(context);
  const session = await getSession(context);
  return {
    ...appProps,
    session,
  };
};

export default MyApp;
