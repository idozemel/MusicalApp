import { genreService } from "../genre/genre.service";
import { artistService } from "../artist/artist.service";
import Song, { ISong } from "./song";
import { ServerError } from "../../ServerError";

const addSongs = async (songs: ISong[]) => {
  try {
    for (let song of songs) {
      await addSong(song);
    }
  } catch (err) {}
};

const getSongs = async () => {
  try {
    return await Song.find()
      .populate("artist", "name link")
      .populate("genre", "name");
  } catch {
    throw new ServerError();
  }
};

const getSong = async (id: string) => {
  try {
    return await Song.findById(id)
      .populate("artist", "name link")
      .populate("genre", "name");
  } catch {
    throw new ServerError();
  }
};

const addSong = async (songToAdd: ISong) => {
  const artistName = songToAdd.artist.name
    .split("&")[0]
    .split("Feat.")[0]
    .trim();
  try {
    const isSongExist = await getSongByName(songToAdd.name);
    const genre = await genreService.getGenre(songToAdd.genre.name);
    const artist =
      (await artistService.getArtist(artistName)) ||
      (await artistService.addArtist({
        ...songToAdd.artist,
        name: artistName,
      }));
    if (isSongExist || !genre || !artist) return;
    const song = new Song({
      ...songToAdd,
      genre,
      artist,
    });
    genre.songs?.push(song);
    artist.songs?.push(song);
    await artist.save();
    await genre.save();
    await song.save();
  } catch {
    throw new ServerError();
  }
};

const getSongByName = async (name: string) => {
  return await Song.findOne({ name });
};

export const songService = {
  addSongs,
  addSong,
  getSongs,
  getSong,
};
