import axios from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {

    const session = await getSession({ req });

    if (!session) {

      return res.status(400);
    }

    const resposne = await axios.get(
      "http://localhost:4000/api/posts/get/all",
      {
        headers: {
          authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    res.status(200).send(resposne.data);
  } catch (er) {
    console.log(er, "er");
    res.status(500);
  }
};

export default handler;
