import { NowRequest, NowResponse } from "@vercel/node";
import { encrypt } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { data, key } = req.body;
  res.send({ result: await encrypt(Buffer.from(JSON.stringify(data)), key) });
}
