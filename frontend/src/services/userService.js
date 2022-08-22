import { configWithToken } from "../actions/configWithToken";
import axios from "axios";

export const isHeAdmin = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3030/api/user/",
      configWithToken(localStorage.getItem("userInfo"))
    );
    return data.isAdmin;
  } catch {}
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(
      `http://localhost:3030/api/user/${id}`,
      configWithToken(localStorage.getItem("userInfo"))
    );
  } catch {}
};
