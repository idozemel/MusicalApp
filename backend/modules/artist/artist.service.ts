import { ServerError } from "../../ServerError";
import Artist, { IArtist } from "./artist";

const addArtist = async (artistToAdd: IArtist) => {
  try {
    const artist = new Artist(artistToAdd);
    return await artist.save();
  } catch (err) {
    console.log(err);

    throw new ServerError();
  }
};

const getArtist = async (name: string) => {
  try {
    return await Artist.findOne({ name });
  } catch {
    throw new ServerError();
  }
};

const getArtistById = async (id: string) => {
  return Artist.findById(id)
    .exec()
    .then((artist) => {
      if (artist) return artist;
      else throw new ServerError();
    })
    .catch((err) => {
      if (err instanceof ServerError) throw err;
      throw new ServerError();
    });
};

const getArtists = async () => {
  try {
    return await Artist.find();
  } catch {
    throw new ServerError();
  }
};

export const artistService = {
  addArtist,
  getArtist,
  getArtists,
  getArtistById,
};
