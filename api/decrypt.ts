import { NowRequest, NowResponse } from '@vercel/node'
import { decrypt } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { encrypted, key } = req.query;
  res.send(await decrypt(new Buffer(encrypted[0]), key[0]));
}