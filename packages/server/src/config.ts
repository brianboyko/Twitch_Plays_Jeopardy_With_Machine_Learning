import { assert } from "console";
import dotenv from "dotenv";
import pick from "lodash/pick";
import path from "path";
console.log(path.resolve(__dirname, "../../../", ".env"));
dotenv.config({ path: path.resolve(__dirname, "../../../", ".env") });

assert(process.env.CANARY === "true");

const config: Record<string, string> = pick(process.env, [
  "DB_URL",
  "DB_NAME",
  "JSERVICE_URL",
  "BOT_USERNAME",
  "CHANNEL_NAME",
  "OAUTH_TOKEN",
  "SERVER_PORT",
]) as Record<string, string>;

export default config;