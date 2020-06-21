import { Request, Response } from "express";

import Image from "../models/Image";

import { IS3Files } from "../types";

export { upload } from "./utils/multer-helper";

export const getAllImages = async (req: Request, res: Response) => {
  const images = await Image.findAll();
  res.json({ success: true, images });
};

export const postUpload = async (req: Request, res: Response) => {
  try {
    const file = req.file as IS3Files;

    const newImage = {
      original_name: file.originalname,
      key: `http://${process.env.BUCKET_NAME}/${file.key}`,
    };

    const image = await Image.create(newImage);

    res.json({ success: true, image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
