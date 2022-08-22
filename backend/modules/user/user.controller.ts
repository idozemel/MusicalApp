import { RequestHandler } from "express";
import { ServerError } from "../../ServerError";
import { IUser } from "./user";
import { userService } from "./user.service";

const signup: RequestHandler = async (req, res, next) => {
  try {
    const {
      email,
      username,
      password,
      gender,
      age,
      name,
    }: Omit<IUser, "isAdmin"> = req.body;
    await userService.addUser({ email, username, password, gender, age, name });
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
    const { text, gender, age } = req.query;
    const users = await userService.getAllUsers({ text, gender, age });
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

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { password, name, gender, age } = req.body;
    const result = await userService.updateUser(
      id,
      password,
      name,
      gender,
      age
    );

    if (id === user?._id || user?.isAdmin) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.send();
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

export { signup, login, getAllUsers, getUser, updateUser, deleteUser };
