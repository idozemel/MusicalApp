import { RequestHandler } from "express";
import { ServerError } from "../../ServerError";
import { IUser } from "./user";
import { userService } from "./user.service";

const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, username, password }: Omit<IUser, "isAdmin"> = req.body;
    await userService.addUser({ email, username, password });
    const token = await userService.getUser(username, password);
    res.json(token);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await userService.getUser(username, password);
    res.json(token);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const getUser: RequestHandler = async (req, res) => {
  try {
    const { user } = req;
    res.json(user);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

export { signup, login, getAllUsers, getUser };
