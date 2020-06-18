import express from "express";

import _ from "lodash";

import { upload } from "../controllers/images";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hello: "world" });
});

router.get("/images", (req, res) => {
  res.json(
    [...Array(10)].map((item, ind) => {
      return {
        id: ind,
        img:
          [...Array(_.random(1, 5))].reduce((prev, curr) => {
            return prev + " and spam";
          }, "spam") + " and eggs",
      };
    })
  );
});

router.post("/upload", upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ TO: "DO" });
});

export default router;
