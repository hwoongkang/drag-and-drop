import express from "express";

import _ from "lodash";

import { upload, getAllImages, postUpload } from "../controllers/images";

const router = express.Router();

router.get("/images", getAllImages);

router.post("/upload", upload.single("img"), postUpload);

export default router;
