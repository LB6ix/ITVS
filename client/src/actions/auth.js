import axios from 'axios';
import { CREATE_USER_SUCCESS, CREATE_USER_FAIL } from './constants';
import { setAlert } from './alert';

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
