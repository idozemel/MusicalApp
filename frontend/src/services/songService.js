import { configWithToken } from "../actions/configWithToken";
import axios from "axios";
const getSongById = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3030/api/song/${id}`,
      configWithToken(localStorage.getItem("userInfo"))
    );
    return data;
  } catch {}
};

const getGenres = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3030/api/genre`,
      configWithToken(localStorage.getItem("userInfo"))
    );
    return data;
  } catch {}
};

const saveSong = async (id, song) => {
  try {
    if (id) {
      const { data } = await axios.put(
        `http://localhost:3030/api/song/${id}`,
        song,
        configWithToken(localStorage.getItem("userInfo"))
      );
      return data;
    } else {
      const { data } = await axios.post(
        `http://localhost:3030/api/song`,
        song,
        configWithToken(localStorage.getItem("userInfo"))
      );
      return data;
    }
  } catch {}
};

export default { getSongById, getGenres, saveSong };
