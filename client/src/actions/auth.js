import axios from 'axios';
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  ADMIN_LOADED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  CLEAR_POSTS,
  CLEAR_HARDWARE,
  CLEAR_HARDWARES,
  CLEAR_SOFTWARE,
  CLEAR_SOFTWARES
} from './constants';
import { setAlert } from './alert';

//user load
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
//testingas
export const loadAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/admin');

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//create user
export const createuser = ({
  firstname,
  lastname,
  email,
  role,
  password
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firstname,
    lastname,
    email,
    role,
    password
  });

  try {
    const res = await axios.post('/api/users', body, config);
    if (res) {
      dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
    } else {
      dispatch({
        type: CREATE_USER_FAIL
      });
    }
    // dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_USER_FAIL
    });
  }
};

//login user
export const userLogin = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const adminLogin = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post('/api/auth/admin', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_HARDWARE });
  dispatch({ type: CLEAR_HARDWARES });
  dispatch({ type: CLEAR_SOFTWARE });
  dispatch({ type: CLEAR_SOFTWARES });
  dispatch({ type: CLEAR_PROFILES });
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: LOGOUT });
};
