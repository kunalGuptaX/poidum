import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // useEffect(() => {
  //   // console.log(status, session);
  // }, [status, session]);

  return <div>{session?.email}</div>;
};

export default Home;
