import { RequestHandler } from "express";
import { songService } from "./song.service";

const getSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await songService.getSongs();
    res.json(songs);
  } catch (err) {
    res.json(err);
  }
};

const getSong: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const songs = await songService.getSong(id);
    res.json(songs);
  } catch (err) {
    res.json(err);
  }
};

const saveSong: RequestHandler = async (req, res, next) => {
  try {
    songService.addSong(req.body);
    res.json();
  } catch (err) {
    res.json(err);
  }
};

export { getSongs, saveSong, getSong };
