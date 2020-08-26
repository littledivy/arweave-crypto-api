import { NowRequest, NowResponse } from '@vercel/node'
import { hash } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { data, algorithm } = req.query;
  res.send(await hash(new TextEncoder().encode(data[0]), algorithm[0]));
}