import { Router } from "express";
import artistRouter from "./modules/artist/artists.routes";
import genreRouter from "./modules/genre/genre.routes";
import songRouter from "./modules/song/song.routes";
import usersRouter from "./modules/user/user.routes";
const router = Router();

router.use("/user", usersRouter);
router.use("/song", songRouter);
router.use("/artist", artistRouter);
router.use("/genre", genreRouter);

export default router;
