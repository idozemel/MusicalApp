import { Router } from "express";
import usersRouter from "./modules/user/user.routes";
import scrapingRouter from "./scraping";
const router = Router();

router.use("/user", usersRouter);
router.use("/scraping", scrapingRouter);

export default router;
