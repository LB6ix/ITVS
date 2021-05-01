import axios from 'axios';
import { setAlert } from '../alert';
import {
  GET_SOFTWARES,
  GET_USER_SOFTWARES,
  GET_SOFTWARE,
  CLEAR_SOFTWARE,
  CLEAR_SOFTWARES,
  SOFTWARE_ERROR,
  ADD_SOFTWARE
} from '../constants';

export const getSoftwares = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/software');

    dispatch({
      type: GET_SOFTWARES,
      payload: res.data
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: SOFTWARE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      console.error(err);
    }
  }
};

export const addSoftware = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/api/software/add-software',
      formData,
      config
    );
    if (!res) {
      throw new Error('Bloga užklausa į serverį');
    }
    dispatch({
      type: ADD_SOFTWARE,
      payload: res.data
    });

    dispatch(setAlert('Programinė įranga pridėta', 'success'));
  } catch (err) {
    dispatch({
      type: SOFTWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
