import { Router } from "express";
import { login, signup, getAllUsers, getUserById } from "./user.controller";
const usersRouter = Router()

usersRouter.post('/login', login)
usersRouter.post('/signup', signup)

//GET all users
usersRouter.get('/', getAllUsers);

//GET user by id
usersRouter.get('/', getUserById);


export default usersRouter