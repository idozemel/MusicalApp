import axios from "axios";
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_LOGOUT,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import { configWithToken } from "./configWithToken";
const config = {
  headers: {
    "Content-type": "application/json",
  },
};
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      "http://localhost:3030/api/user/login",
      {
        username,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("songsInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GET_USER_LOGOUT });
};

export const register =
  (email, username, password, gender, age, name) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const { data } = await axios.post(
        "http://localhost:3030/api/user/signup",
        {
          email,
          username,
          password,
          gender,
          age,
          name,
        },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get(
      "http://localhost:3030/api/user/",
      configWithToken(localStorage.getItem("userInfo"))
    );
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const { data } = await axios.get(
      "http://localhost:3030/api/user/all",
      configWithToken(localStorage.getItem("userInfo"))
    );
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userEdit =
  (id, password, name, gender, age) => async (dispatch) => {
    try {
      dispatch({ type: USER_EDIT_REQUEST });

      const { data } = await axios.put(
        `http://localhost:3030/api/user/${id}`,
        {
          id,
          password,
          gender,
          age,
          name,
        },
        configWithToken(localStorage.getItem("userInfo"))
      );
      dispatch({ type: USER_EDIT_SUCCESS, payload: data });
      dispatch(getUser());
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:3030/api/user/${id}`,
      configWithToken(localStorage.getItem("userInfo"))
    );
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGOUT, payload: data });
    dispatch({ type: GET_USER_LOGOUT, payload: data });
    localStorage.removeItem("userInfo");
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
