import { RequestHandler } from "express";
import { ServerError } from "../../ServerError";
import { chatService } from "./chat.service";

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const chat = await chatService.getChat();
    res.json(chat?.messages);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};
