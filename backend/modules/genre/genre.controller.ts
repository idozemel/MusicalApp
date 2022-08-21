import { RequestHandler } from "express";
import { ServerError } from "../../ServerError";
import Genre from "./genre";
import { genreService } from "./genre.service";

const getGenres: RequestHandler = async (req, res) => {
  try {
    const genres = await genreService.getGenres();
    res.json(genres);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const getGenre: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await genreService.getGenreById(id);
    res.send(genre);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const songsCount: RequestHandler = async (req, res) => {
  try {
    const result = await genreService.songsCount();
    res.json(result);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const saveGenre: RequestHandler = async (req, res) => {
  try {
    const savedGenre = await genreService.addGenres([req.body]);
    res.json(savedGenre);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

export { saveGenre, getGenres, songsCount, getGenre };
