import { Router } from "express";
import { saveSong } from "./song.controller";
const songRouter = Router();

// songRouter.get("/songs", login);
songRouter.post("/", saveSong);

export default songRouter;
