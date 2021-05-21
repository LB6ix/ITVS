import {
  CREATE_USER_SUCCESS,
  //CREATE_USER_FAIL,
  ADMIN_LOADED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isAdmin: null,
  loading: true,
  user: null
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: true,
        loading: false,
        user: payload
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        // ...payload,
        loading: false
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
        user: null
      };

    default:
      return state;
  }
}

export default authReducer;
