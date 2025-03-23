import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/app/lib/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedResponse = await cloudinary.v2.uploader.upload(file, {
      folder: "library-thumbnails",
    });

    res.status(200).json({ url: uploadedResponse.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
}