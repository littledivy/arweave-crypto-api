import { NowRequest, NowResponse } from '@vercel/node'
import { hash } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { data, algorithm } = req.body;
  res.send(await hash(data, algorithm || null));
}