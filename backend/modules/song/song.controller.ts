import { RequestHandler } from "express";
import { ServerError } from "../../ServerError";
import { songService } from "./song.service";

const getSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await songService.getSongs();
    res.json(songs);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const getSong: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const songs = await songService.getSong(id);
    res.json(songs);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const saveSong: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    let song;
    if (id) song = await songService.editSong(id, req.body);
    else song = await songService.addSong(req.body);
    res.json(song);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const deleteSong: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) await songService.deleteSong(id);
    res.json();
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};
export { getSongs, saveSong, getSong, deleteSong };
