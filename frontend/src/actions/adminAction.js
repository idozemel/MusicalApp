import axios from "axios";
import {
  FILTER_USERS_FAIL,
  FILTER_USERS_REQUEST,
  FILTER_USERS_SUCCESS,
} from "../constants/adminConstant";
import { configWithToken } from "./configWithToken";

export const getFilterUsers = (filters) => async (dispatch) => {
  try {
    const config = configWithToken(localStorage.getItem("userInfo"));

    dispatch({ type: FILTER_USERS_REQUEST });
    const { age, text, gender } = filters;
    const { data } = await axios.get("http://localhost:3030/api/user/all", {
      params: { age, text, gender },
      ...config,
    });
    dispatch({ type: FILTER_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FILTER_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
