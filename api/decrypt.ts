import { NowRequest, NowResponse } from "@vercel/node";
import { decrypt } from "../crypto";

export default async function (req: NowRequest, res: NowResponse) {
  const { encrypted, key } = req.body;
  res.send(
    { result: await decrypt(Buffer.from(JSON.stringify(encrypted)), key) },
  );
}
