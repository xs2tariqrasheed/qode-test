import { NextApiRequest, NextApiResponse } from "next";

(globalThis as any).images = [];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ data: (globalThis as any).images });
}
