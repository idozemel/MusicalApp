import { RequestHandler } from "express";

const getSongs: RequestHandler = async (req, res, next) => {
  try {
  } catch (err) {
    res.json(err);
  }
};

const saveSong: RequestHandler = async (req, res, next) => {
  try {
    // const { email, username, password, isAdmin } = req.body;
    // await songService.saveSong(username, password);
    res.json();
  } catch (err) {
    res.json(err);
  }
};

export { getSongs, saveSong };
