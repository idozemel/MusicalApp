import { Router } from "express";
import { login, signup } from "./user.controller";
const usersRouter = Router()

usersRouter.post('/login', login)
// usersRouter.post('/logout', logout)
usersRouter.post('/signup', signup)


export default usersRouter