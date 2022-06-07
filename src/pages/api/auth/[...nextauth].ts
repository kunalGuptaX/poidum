import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function refreshAccessToken(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  try {
    const url = `${process.env.SERVER_URL}/api/users/refresh`;
    const response = await axios.post(url, null, {
      headers: req.headers as any,
    });

    Object.entries(response.headers).forEach((keyArr) => {
      if (keyArr[0] === "set-cookie") {
        res.setHeader(keyArr[0], keyArr[1] as string);
      }
    });
    const user = response.data;

    return {
      ...token,
      accessToken: user.access_token,
      accessTokenExpires: user.accessTokenExpires,
    };
  } catch (error) {
    console.log(error);

    return {
      error: "RefreshAccessTokenError",
    };
  }
}

export const nextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
          fullName: { label: "Full Name", type: "text" },
          lastName: { label: "Last Name", type: "text" },
          newUser: { label: "New User", type: "boolean" },
        },
        async authorize(credentials) {
          let response;
          if (credentials?.newUser) {
            response = await axios.post(
              `${process.env.SERVER_URL}/api/users/signup`,
              credentials
            );
          } else {
            response = await axios.post(
              `${process.env.SERVER_URL}/api/users/signin`,
              credentials
            );
          }

          Object.entries(response.headers).forEach((keyArr) => {
            if (keyArr[0] === "set-cookie") {
              res.setHeader(keyArr[0], keyArr[1] as string);
            }
          });
          const user = response.data;

          return user;
        },
        type: "credentials",
        id: "credentials",
      }),
    ],
    callbacks: {
      jwt({ token, account, isNewUser, profile, user }) {
        if (account && user?.access_token) {
          token.accessToken = user.access_token as string;
          token.accessTokenExpires = user.accessTokenExpires;
          return token;
        }

        const currentTime = new Date().getTime();
        const tokenExpireTime = new Date(
          +(token.accessTokenExpires as number)
        ).getTime();

        if (tokenExpireTime >= currentTime) {
          return token;
        }

        console.log("Fetched refresh token");

        return refreshAccessToken(req, res, token);
      },
      async session({ session, token, user }) {
        const response = await axios.get(
          `${process.env.SERVER_URL}/api/users/currentuser`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        );

        if (response.data) {
          session = {
            ...session,
            ...(response.data?.currentUser || {}),
          };
        }
        session.accessToken = token.accessToken;
        session.accessTokenExpires = token.accessTokenExpires;
        return session;
      },
    },
    pages: {
      signIn: "/signin",
    },
    session: {
      strategy: "jwt",
    },
  };
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return nextAuth(req, res, nextAuthOptions(req, res));
};

export default handler;
