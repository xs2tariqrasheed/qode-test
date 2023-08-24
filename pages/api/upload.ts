import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    (globalThis as any).images.unshift({
      id: req.body.id,
      comment: req.body.comment,
    });
    res
      .status(200)
      .json({ message: "Upload successful", filePath: req.body.id });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
