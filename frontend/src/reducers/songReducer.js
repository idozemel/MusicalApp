import {
  ALL_SONGS_FAIL,
  ALL_SONGS_REQUEST,
  ALL_SONGS_SUCCESS,
} from "../constants/songConstant";

export const allSongsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_SONGS_REQUEST:
      return { loading: true };

    case ALL_SONGS_SUCCESS:
      return { loading: false, songsInfo: action.payload };

    case ALL_SONGS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
