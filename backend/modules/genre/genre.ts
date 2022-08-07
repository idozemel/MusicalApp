import mongoose, { Schema } from "mongoose";
import { ISong } from "../song/song";

export interface IGenre {
  name: string;
  songs?: ISong[];
}

const GenreSchema = new Schema<IGenre>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const Genre = mongoose.model<IGenre>("Genre", GenreSchema);
export default Genre;
