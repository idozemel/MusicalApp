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
  USER_REGISTER_DONE,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_DONE:
      return {};
    default:
      return state;
  }
};


export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };

    case GET_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case GET_USER_FAIL:
      return { loading: false, error: action.payload };

    case GET_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};


export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { loading: true };

    case GET_ALL_USERS_SUCCESS:
      return { loading: false, allUsers: action.payload };

    case GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const usersEditReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true };

    case USER_EDIT_SUCCESS:
      return { loading: false, userEdit: action.payload, success:true};

    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload, success:false };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, allDelete: action.payload, success:true, error:{} };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload, success:false };

    default:
      return state;
  }
};