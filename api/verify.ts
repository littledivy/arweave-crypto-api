import { NowRequest, NowResponse } from '@vercel/node'
import { verify } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { publicModulus, data, signature } = req.query;
  res.send(await verify(publicModulus[0], new TextEncoder().encode(data[0]), new TextEncoder().encode(signature[0])));
}