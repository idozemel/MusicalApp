import User, { IUser } from "./user";

import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose, { MongooseError } from "mongoose";
import bcrypt from "bcrypt";
import { ServerError } from "../../ServerError";
import { configConstants } from "../../config";

const addUser = ({
  email,
  username,
  password,
  gender,
  age,
  name,
}: Omit<IUser, "isAdmin">) => {
  return new Promise<void>((resolve, reject) => {
    User.findOne({ $or: [{ email }, { username }] })
      .exec()
      .then((user: IUser | null) => {
        if (user)
          reject(new ServerError(411, "username or email already exists"));
        else
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              reject(new ServerError());
            } else {
              const user: any = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                username,
                gender: gender || "male",
                age: age || 22,
                name: name || "dudi",
                password: hash,
                isAdmin: false,
              });
              return user
                .save()
                .then(() => resolve())
                .catch((err: MongooseError) => {
                  if (err.name === "ValidationError")
                    reject(new ServerError(400, "Validation failed"));
                  else reject(new ServerError());
                });
            }
          });
      })
      .catch(() => reject(new ServerError()));
  });
};

const updateUser = async (
  id: string,
  password: string,
  name: string,
  gender: string,
  age: number
) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => {
        if (!user) reject(new ServerError(404, "user not found"));
        bcrypt.compare(password, user!.password, (err, res) => {
          if (err) {
            reject(new ServerError());
          }
          if (res) {
            user
              ?.updateOne({ name, gender, age })
              .exec()
              .then(() => {
                getUser(user.username, password)
                  .then((token) => resolve(token))
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch(() => reject(new ServerError()));
          } else {
            reject(new ServerError(401, "Wrong password"));
          }
        });
      });
  });
};

const deleteUser = async (id: string) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch {
    throw new ServerError();
  }
};
const getUser = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .exec()
      .then((user) => {
        if (!user) return reject(new ServerError(411, "Failed to to login"));
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) reject(new ServerError(411, "Failed to to login"));
          if (res) {
            jwt.sign(
              { user: { ...user.toObject(), password: null } },
              configConstants.jwtSecret,
              {
                expiresIn: "7d",
              },
              function (err, token) {
                if (err) {
                  reject(new ServerError());
                } else {
                  resolve(token);
                }
              }
            );
          } else reject(new ServerError(411, "Wrong username or password"));
        });
      });
  });
};

const getUserById = (id: string | JwtPayload | undefined) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => {
        if (!user) reject(new ServerError(404, "Not found"));
        else resolve(user);
      })
      .catch(() => {
        reject(new ServerError());
      });
  });
};

//Get All Users
const getAllUsers = async (filters: any) => {
  try {
    const { text, gender, age } = filters;
    return await User.aggregate([
      {
        $match: {
          $and: [
            { age: { $lt: age[1] } },
            { age: { $gte: age[0] } },
            { gender: { $regex: gender, $options: "i" } },
          ],
          $or: [
            { username: { $regex: text, $options: "i" } },
            { email: { $regex: text, $options: "i" } },
          ],
        },
      },
    ]);
  } catch {
    throw new ServerError();
  }
};

export const userService = {
  addUser,
  updateUser,
  getUser,
  getUserById,
  getAllUsers,
  deleteUser,
};
