import { RequestHandler } from "express";
import { configConstants } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload | undefined;
    }
  }
}

export const authenticateJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, configConstants.jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
