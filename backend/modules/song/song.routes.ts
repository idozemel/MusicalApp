import { Router } from "express";
import { getSong, getSongs, saveSong } from "./song.controller";
const songRouter = Router();

songRouter.post("/", saveSong);
songRouter.get("/", getSongs);
songRouter.get("/:id", getSong);

export default songRouter;
