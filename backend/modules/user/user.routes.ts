import { Router } from "express";
import { login, signup, getAllUsers } from "./user.controller";
const usersRouter = Router()

usersRouter.post('/login', login)
// usersRouter.post('/logout', logout)
usersRouter.post('/signup', signup)

//GET all users
usersRouter.get('/', getAllUsers);

export default usersRouter