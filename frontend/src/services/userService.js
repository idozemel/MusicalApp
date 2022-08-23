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

export const checkPassword = async (username, password) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "http://localhost:3030/api/user/login",
      {
        username,
        password,
      },
      config
    );
    if (data) return true;
    else return false;
  } catch {
    return false;
  }
};
