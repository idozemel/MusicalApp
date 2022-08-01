import mongoose, { Schema } from "mongoose";
import { IGenre } from "../genre/genre";

export interface ISong {
  name: string;
  genre: IGenre;
  link: string;
  image?: string;
}

const songSchema = new Schema<ISong>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: "Genre",
  },
  image: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
});

const Song = mongoose.model<ISong>("Song", songSchema);
export default Song;
