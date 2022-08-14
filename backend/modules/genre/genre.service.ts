import mongoose, { MongooseError } from "mongoose";
import Genre, { IGenre } from "./genre";

const addGenres = async (genres: string[]) => {
  const parsedGenres: { name: string }[] = genres.map((g) => ({ name: g }));
  console.log(parsedGenres);
  Genre.insertMany<IGenre[]>(
    parsedGenres,
    { ordered: false },
    function (error) {}
  );
};

const getGenre = async (name: string) => {
  return await Genre.findOne({ name });
};

export const genreService = {
  addGenres,
  getGenre,
};
