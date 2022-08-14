import { RequestHandler } from "express";
import { IUser } from "./user";
import { userService } from "./user.service";

const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, username, password, isAdmin }: IUser = req.body;
    await userService.addUser({ email, username, password , isAdmin});
    const token = await userService.getUser(username, password);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await userService.getUser(username, password);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);

  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export { signup, login, getAllUsers };
