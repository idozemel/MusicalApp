import { ServerError } from "../../ServerError";
import Genre, { IGenre } from "./genre";

const addGenres = async (genres: string[]) => {
  const parsedGenres: { name: string }[] = genres.map((g) => ({ name: g }));
  Genre.insertMany<IGenre[]>(
    parsedGenres,
    { ordered: false },
    function (error) {}
  );
};

const getGenre = async (name: string) => {
  return await Genre.findOne({ name });
};

const getGenres = async () => {
  try {
    return await Genre.find();
  } catch {
    throw new ServerError();
  }
};

const getGenreById = async (_id: string) => {
  return await Genre.findOne({ _id });
};

const songsCount = async () => {
  try {
    return await Genre.aggregate([
      {
        $group: {
          _id: "$name",
          songs: {
            $sum: {
              $size: "$songs",
            },
          },
        },
      },
    ]);
  } catch (e) {
    console.log(e);
  }
};

export const genreService = {
  addGenres,
  getGenres,
  getGenreById,
  getGenre,
  songsCount,
};
