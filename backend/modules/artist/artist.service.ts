import mongoose, { MongooseError } from "mongoose";
import Artist, { IArtist } from "./artist";

const addArtist = async (artistToAdd: IArtist) => {
  const artist = new Artist(artistToAdd);
  return await artist.save();
};

const getArtist = async (name: string) => {
  return await Artist.findOne({ name });
};

export const artistService = { addArtist, getArtist };
