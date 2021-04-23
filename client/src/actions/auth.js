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
  CLEAR_PROFILE
} from './constants';
import { setAlert } from './alert';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { check } from 'express-validator';

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

    dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
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
export const login = ({ email, password }) => async (dispatch) => {
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

    //checkAdminAuth();

    dispatch(loadUser());
    // dispatch(loadAdmin());
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

//testingas
// export const checkAdminAuth = () => async (dispatch) => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;
//   console.log('123');
//   try {
//     jwt.verify(token, (decoded) => {
//       if (decoded.user.role !== 'admin') {
//         dispatch(loadUser());
//       } else {
//         dispatch(loadAdmin());
//       }
//     });

// const role = decode(token);
// if (!user) {
//   dispatch({
//     type: AUTH_ERROR
//   });
// }
// if (role !== 'admin') {
//   dispatch({
//     type: AUTH_ERROR
//   });
// } else {
//   dispatch({
//     type: ADMIN_LOADED,
//     payload: user.data
//   });
// }

//dispatch(loadUser());
//     //dispatch(loadAdmin());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// };

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
