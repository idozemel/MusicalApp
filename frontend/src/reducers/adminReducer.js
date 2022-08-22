import { FILTER_USERS_FAIL, FILTER_USERS_REQUEST, FILTER_USERS_SUCCESS } from "../constants/adminConstant";

export const getAllUsersReducer = (state = {}, action) => {
    switch (action.type) {
      case FILTER_USERS_REQUEST:
        return { loading: true };
  
      case FILTER_USERS_SUCCESS:
        return { loading: false, filterUsers: action.payload };
  
      case FILTER_USERS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };