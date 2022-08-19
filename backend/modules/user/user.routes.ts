import { Router } from "express";
import { authenticateJWT } from "../../middlewares/auth";
import {
  login,
  signup,
  getAllUsers,
  getUser,
} from "./user.controller";
const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/signup", signup);

//GET all users
usersRouter.get("/all", authenticateJWT, getAllUsers);

//GET user by id
usersRouter.get("/", authenticateJWT, getUser);

export default usersRouter;
