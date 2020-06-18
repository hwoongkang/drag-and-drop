import multer from "multer";
import multerS3 from "multer-s3";

import path from "path";

import s3 from "./aws";

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "img.jinwoolove.com",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname, contenttype: file.mimetype });
    },
    key: (req, file, cb) => {
      cb(
        null,
        "images/" + Date.now().toString() + path.extname(file.originalname)
      );
    },
  }),
});
