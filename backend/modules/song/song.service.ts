import mongoose, { MongooseError } from "mongoose";

const addSong = async () => {
  try {
  } catch (err) {
    throw { status: 500, message: "internal" };
  }
};

export const userService = {
  addSong,
};
