import { Application, Request, Response } from "express";
import axios from "axios";
import get from "lodash/get";
import config from "../../config";

const postUserId = (app: Application, apiToken: string): void => {
  app.post("/userid", async (req: Request, res: Response) => {
    const userId: string | false = get(req, "extension.user_id", false);
    if (!userId) {
      res
        .status(401)
        .json({ error: true, message: "Not Logged into Extension" });
      return;
    }
    try {
      const response = await axios.get("https://api.twitch.tv/helix/users", {
        params: {
          id: userId,
        },
        headers: {
          "client-id": config.JEOPARDY_INTERACTION_CLIENT_ID,
          authorization: `Bearer ${apiToken}`,
        },
      });
      console.log(
        "TwitchAPI Rate:",
        response.headers["ratelimit-remaining"],
        "/",
        response.headers["ratelimit-limit"]
      );
      res.json({ data: response.data });
    } catch (err) {
      if (err.response.statusCode) {
        console.error(
          "Twitch API streams Failed",
          err.response.statusCode,
          err.response.body
        );
      } else {
        console.error(err.response.data);
      }
      res.status(500).json({
        error: true,
        message: "Twitch API failed",
        data: err.response.data,
      });
    }
  });
};

export default postUserId;
