import axios from "axios";
import {
  ALL_SONGS_FAIL,
  ALL_SONGS_REQUEST,
  ALL_SONGS_SUCCESS,
} from "../constants/songConstant";
import { configWithToken } from "./configWithToken";

export const getAllSong = (filters) => async (dispatch) => {
  try {
    const config = configWithToken(localStorage.getItem("userInfo"));
    dispatch({ type: ALL_SONGS_REQUEST });
    const { data } = await axios.get("http://localhost:3030/api/song/", {
      params: filters,
      ...config,
    });

    dispatch({ type: ALL_SONGS_SUCCESS, payload: data });

    localStorage.setItem("songsInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ALL_SONGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
