import { Router } from "express";
import { authenticateJWT, requireAdmin } from "../../middlewares/auth";
import {
  login,
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.controller";
const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/signup", signup);
usersRouter.put("/:id", authenticateJWT, updateUser);
usersRouter.delete("/:id", authenticateJWT, deleteUser);

//GET all users
usersRouter.get("/all", authenticateJWT, requireAdmin, getAllUsers);

//GET user by id
usersRouter.get("/", authenticateJWT, getUser);

export default usersRouter;
