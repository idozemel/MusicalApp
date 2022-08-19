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

export default { getSongById };
