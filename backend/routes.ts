import { Router } from "express";
import songRouter from "./modules/song/song.routes";
import usersRouter from "./modules/user/user.routes";
import scrapingRouter from "./scraping";
const router = Router();

router.use("/user", usersRouter);
router.use("/song", songRouter);
router.use("/scraping", scrapingRouter);

export default router;
