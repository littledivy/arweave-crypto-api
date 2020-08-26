import { NowRequest, NowResponse } from '@vercel/node'
import { sign } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { jwk, data } = req.query;
  res.send(await sign(JSON.parse(jwk[0]), new TextEncoder().encode(data[0])));
}