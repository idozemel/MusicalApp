import { RequestHandler } from "express";
import { configConstants } from "../config";
import jwt from "jsonwebtoken";
import { IUser } from "../modules/user/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser & { _id: string };
    }
  }
}

interface myJwtPayload {
  user: IUser & { _id: string };
}

export const authenticateJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const { user } = jwt.verify(
        token,
        configConstants.jwtSecret
      ) as myJwtPayload;
      req.user = user;
      next();
    } catch {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  const { user } = req;
  if (!user || !user.isAdmin) return res.sendStatus(403);
  req.user = { ...user };
  next();
};
