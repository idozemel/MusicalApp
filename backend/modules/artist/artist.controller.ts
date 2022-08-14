import { RequestHandler } from "express";
import { artistService } from "./artist.service";

const getArtists: RequestHandler = async (req, res) => {
  try {
    const songs = await artistService.getArtists();
    res.status(200).json(songs);
  } catch (err) {
    res.json(err);
  }
};

const getArtist: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await artistService.getArtistById(id);
    console.log(artist);
    res.status(200).send(artist);
  } catch (err) {
    res.json(err);
  }
};

const saveArtist: RequestHandler = async (req, res) => {
  try {
    const savedArtist = await artistService.addArtist(req.body);
    res.status(200).json(savedArtist);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export { saveArtist, getArtists, getArtist };
