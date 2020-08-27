import { NowRequest, NowResponse } from "@vercel/node";
import { sign } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { jwk, data } = req.body;
  res.send({ result: await sign(jwk, Buffer.from(JSON.stringify(data))) });
}
