import { Router } from "express";
import { getMessages } from "./chat.controller";

const chatRouter = Router();

chatRouter.get("/", getMessages);

export default chatRouter;
