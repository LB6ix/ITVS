import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  role: null,
  loading: true, //request is made, response received
  showPageContent: false,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        showPageContent: false,
        loading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        showPageContent: false
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    //add password confirmation?
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
        loading: false,
        showPageContent: false,
        user: null
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
