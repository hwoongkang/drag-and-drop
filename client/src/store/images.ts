import { atom } from "recoil";
import { IImageModel } from "../types";

export const imagesState = atom({
  key: "imagesState",
  default: [] as IImageModel[],
});

export const foobar = "to make ts lint not complain";
