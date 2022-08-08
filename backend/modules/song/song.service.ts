import { genreService } from "../genre/genre.service";
import { artistService } from "../artist/artist.service";
import Song, { ISong } from "./song";

const addSongs = async (songs: ISong[]) => {
  try {
    for (let song of songs) {
      await addSong(song);
    }
  } catch (err) {}
};

const getSongs = async () => {
  return await Song.find()
    .populate("artist", "name link")
    .populate("genre", "name");
};

const addSong = async (songToAdd: ISong) => {
  const artistName = songToAdd.artist.name
    .split("&")[0]
    .split("Feat.")[0]
    .trim();
  console.log(
    `~~~~~~~~~~~~~~~~~ Adding ~~~~~~~~~~~~~~~~~ \nSong: ${songToAdd.name}\nArtist: ${artistName}\ngenre: ${songToAdd.genre.name}\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
  );

  const isSongExist = await getSongByName(songToAdd.name);
  const genre = await genreService.getGenre(songToAdd.genre.name);
  const artist =
    (await artistService.getArtist(artistName)) ||
    (await artistService.addArtist({ ...songToAdd.artist, name: artistName }));
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
};

const getSongByName = async (name: string) => {
  return await Song.findOne({ name });
};

export const songService = {
  addSongs,
  addSong,
  getSongs,
};
