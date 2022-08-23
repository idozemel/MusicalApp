import axios from "axios";
import {
  ALL_SONGS_FAIL,
  ALL_SONGS_REQUEST,
  ALL_SONGS_SUCCESS,
  SONGS_DELETE_FAIL,
  SONGS_DELETE_REQUEST,
  SONGS_DELETE_SUCCESS,
} from "../constants/songConstant";
import { configWithToken } from "./configWithToken";

export const getAllSong = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SONGS_REQUEST });
    const { data } = await axios.get(
      "http://localhost:3030/api/song/",
      configWithToken(localStorage.getItem("userInfo"))
    );

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

// export const deleteSong = (id) => {
//   axios
//     .delete(
//       `http://localhost:3030/api/user/${id}`,
//       configWithToken(localStorage.getItem("userInfo"))
//     )
//     .then((res) => {
//       console.log(res);
//       dispatch(getAllSong())
//       navigate("/songs");
//     });
// };


export const songDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: SONGS_DELETE_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:3030/api/song/${id}`,
      configWithToken(localStorage.getItem("userInfo"))
    );
    dispatch({ type: SONGS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SONGS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
