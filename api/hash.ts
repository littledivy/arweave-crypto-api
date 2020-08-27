import { NowRequest, NowResponse } from "@vercel/node";
import { hash } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { data, algorithm } = req.body;
  res.send(
    {
      result: await hash(Buffer.from(JSON.stringify(data)), algorithm || null),
    },
  );
}
