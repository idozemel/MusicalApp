import { Router } from "express";
import songRouter from "./modules/song/song.routes";
import usersRouter from "./modules/user/user.routes";
const router = Router();

router.use("/user", usersRouter);
router.use("/song", songRouter);

export default router;
