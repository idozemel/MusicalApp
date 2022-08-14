import Artist, { IArtist } from "./artist";

const addArtist = async (artistToAdd: IArtist) => {
  const artist = new Artist(artistToAdd);
  return await artist.save();
};

const getArtist = async (name: string) => {
  return await Artist.findOne({ name });
};

const getArtistById = async (id: string) => {
  return Artist.findById(id)
    .exec()
    .then((artist) => {
      if (artist) return artist;
      else
        throw {
          status: 404,
          message: "not found",
        };
    })
    .catch((err) => {
      if (err?.status === 404) throw err;
      throw {
        status: 500,
        message: "internal server error",
      };
    });
};

const getArtists = async () => {
  return await Artist.find();
};

export const artistService = {
  addArtist,
  getArtist,
  getArtists,
  getArtistById,
};
