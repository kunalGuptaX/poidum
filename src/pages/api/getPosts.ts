import axios from "axios";

const getPostsHandler = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/api/posts/get/all`,
      /**@ts-ignore */
      { headers: req.headers }
    );
    console.log(response.data);
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export default getPostsHandler;
