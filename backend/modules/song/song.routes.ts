import { Router } from "express";
import { getSongs, saveSong } from "./song.controller";
const songRouter = Router();

// songRouter.get("/songs", login);
songRouter.post("/", saveSong);
songRouter.get("/", getSongs);

export default songRouter;
