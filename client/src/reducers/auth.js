import { CREATE_USER_SUCCESS, CREATE_USER_FAIL } from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  //add roles
  loading: true, //request is made, response received
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    //add password confirmation?
    case CREATE_USER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
