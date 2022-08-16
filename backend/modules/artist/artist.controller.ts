import { RequestHandler } from "express";
import { ServerError } from "../../ServerError";
import { artistService } from "./artist.service";

const getArtists: RequestHandler = async (req, res) => {
  try {
    const artists = await artistService.getArtists();
    res.json(artists);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const getArtist: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await artistService.getArtistById(id);
    res.send(artist);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};

const saveArtist: RequestHandler = async (req, res) => {
  try {
    const savedArtist = await artistService.addArtist(req.body);
    res.json(savedArtist);
  } catch (err) {
    if (err instanceof ServerError) res.status(err.code);
    res.json(err);
  }
};


export { saveArtist, getArtists, getArtist };
