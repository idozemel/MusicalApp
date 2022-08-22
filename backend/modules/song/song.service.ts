import { genreService } from "../genre/genre.service";
import { artistService } from "../artist/artist.service";
import Song, { ISong } from "./song";
import { ServerError } from "../../ServerError";
import Artist from "../artist/artist";
import Genre from "../genre/genre";

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

function isASong(obj: any): obj is ISong {
  return "artist" in obj && "name" in obj && "genre" in obj;
}

const addSong = async (songToAdd: ISong) => {
  if (!isASong(songToAdd)) return new ServerError(400, "Bad request");
  try {
    const artistName = songToAdd.artist.name
      .split("&")[0]
      .split("Feat.")[0]
      .trim();
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
    return song;
  } catch {
    throw new ServerError();
  }
};

const editSong = async (_id: string, song: ISong) => {
  if (!isASong(song)) return new ServerError(400, "Bad request");
  try {
    let artist, genre;
    const songToEdit = await Song.findById({ _id });
    genre = await genreService.getGenre(song.genre.name);

    if (song.genre.name !== songToEdit?.genre.name) {
      genre?.songs!.push(song);
      await genre?.save();
      await Genre.findOneAndUpdate(
        { _id: songToEdit?.genre },
        { $pull: { songs: _id } }
      );
    }

    const newArtist = {
      name: song.artist.name,
      link: song.artist.link,
    };
    artist = await artistService.getArtist(song.artist.name);
    if (song.artist.name === songToEdit?.artist.name) {
      await artist?.updateOne({
        $set: { ...newArtist },
      });
    } else {
      await Artist.findOneAndUpdate(
        { _id: songToEdit?.artist },
        { $pull: { songs: _id } }
      );
      if (artist) {
        artist?.songs!.push(song);
        await artist?.save();
        await artist?.updateOne({
          $set: { ...newArtist },
        });
      } else {
        artist = await artistService.addArtist(newArtist);
        artist?.songs!.push(song);
        await artist?.save();
      }
    }

    await Song.updateOne(
      { _id },
      { $set: { ...song, genre: genre!._id, artist: artist!._id } }
    );
  } catch (err) {
    throw new ServerError();
  }
};

const getSongByName = async (name: string) => {
  return await Song.findOne({ name });
};
const deleteSong = async (_id: string) => {
  try {
    const song = await Song.findByIdAndDelete(_id);
    await Artist.findOneAndUpdate(
      { _id: song?.artist },
      { $pull: { songs: _id } }
    );
    await Genre.findOneAndUpdate(
      { _id: song?.genre },
      { $pull: { songs: _id } }
    );
  } catch {
    throw new ServerError();
  }
};

export const songService = {
  addSongs,
  deleteSong,
  addSong,
  getSongs,
  editSong,
  getSong,
};
