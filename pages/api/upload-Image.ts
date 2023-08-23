// pages/api/uploadImage.ts

import { addImageData } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { imageUrl, comment } = req.body;

    const imageData = addImageData(imageUrl, comment);

    res.status(200).json(imageData);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
