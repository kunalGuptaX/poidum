import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const getSessionOnServer = async (
  req: GetServerSidePropsContext["req"]
) => {
  return await getSession({ req: req });
};
