import mongoose, { MongooseError } from "mongoose";
import Genre, { IGenre } from "./genre";

const addGenres = async (genres: string[]) => {
  const parsedGenres: { name: string }[] = genres.map((g) => ({ name: g }));
  console.log(parsedGenres);
  Genre.insertMany<IGenre[]>(
    parsedGenres,
    { ordered: false },
    function (err, result: any) {
      console.log(err?.message);
    }
  );
};

const getGenre = "fdf"

export const genreService = {
  addGenres,
};
