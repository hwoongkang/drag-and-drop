import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  console.log("setting dotenv...");
  dotenv.config();
}
