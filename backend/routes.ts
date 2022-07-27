import { Router } from "express";
import usersRouter from "./modules/user/user.routes";
const router = Router();

router.use("/user", usersRouter);

export default router