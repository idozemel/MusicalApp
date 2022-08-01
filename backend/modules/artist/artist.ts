import mongoose, { Schema } from "mongoose";
import { ISong } from "../song/song";

export interface IArtist {
  name: string;
  link: string;
  songs: ISong[];
}

const artistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
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

const Artist = mongoose.model<IArtist>("Artist", artistSchema);
export default Artist;
