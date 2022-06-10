import axios from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, subTitle, body } = req.body;

  const session = await getSession({ req });

  if (!session || !title || !subTitle || !body) {
    return res.status(400);
  }

  const resposne = await axios.post(
    "http://localhost:4000/api/posts/new",
    {
      title,
      subTitle,
      body,
      banner: "test banner",
    },
    {
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  res.status(200).send(resposne)
};

export default handler;
