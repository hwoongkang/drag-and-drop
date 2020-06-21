import { Express } from "express";

export interface IS3Files extends Express.Multer.File {
  key: string;
}
