import { Router } from "express";
import { authenticateJWT } from "./middlewares/auth";
import artistRouter from "./modules/artist/artists.routes";
import genreRouter from "./modules/genre/genre.routes";
import songRouter from "./modules/song/song.routes";
import usersRouter from "./modules/user/user.routes";
const router = Router();

router.use("/user", usersRouter);
router.use("/song", authenticateJWT, songRouter);
router.use("/artist", authenticateJWT, artistRouter);
router.use("/genre", authenticateJWT, genreRouter);

export default router;
