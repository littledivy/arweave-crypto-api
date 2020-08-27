import { NowRequest, NowResponse } from "@vercel/node";
import { generateJWK } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  res.send(await generateJWK());
}
