import axios from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { title, subTitle, body } = req.body;

    const session = await getSession({ req });

    if (!session || !title || !body) {
      return res.status(400).send({});
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
    res.status(200).send(resposne.data);
  } catch (err) {
    console.log(err, 'to');
    res.status(400).send(err);
  }
};

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '50mb', // Set desired value here
          externalResolver: true,
      }
  }
}

export default handler;
