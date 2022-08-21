import { Router } from "express";
import { requireAdmin } from "../../middlewares/auth";
import { getSong, getSongs, saveSong, deleteSong } from "./song.controller";
const songRouter = Router();

songRouter.post("/", requireAdmin, saveSong);
songRouter.put("/:id", requireAdmin, saveSong);
songRouter.get("/", getSongs);
songRouter.get("/:id", getSong);
songRouter.delete("/:id", requireAdmin, deleteSong);

export default songRouter;
