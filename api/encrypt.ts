import { NowRequest, NowResponse } from '@vercel/node'
import { encrypt } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { data, key } = req.query;
  res.send(await encrypt(new Buffer(data[0]), key[0]));
}