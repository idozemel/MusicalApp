import { Router } from "express";
import { requireAdmin } from "../../middlewares/auth";
import { getSong, getSongs, saveSong } from "./song.controller";
const songRouter = Router();

songRouter.post("/", requireAdmin, saveSong);
songRouter.get("/", getSongs);
songRouter.get("/:id", getSong);

export default songRouter;
