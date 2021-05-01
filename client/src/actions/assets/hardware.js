import axios from 'axios';
import { setAlert } from '../alert';
import {
  GET_HARDWARES,
  GET_USER_HARDWARES,
  GET_HARDWARE,
  CLEAR_HARDWARE,
  CLEAR_HARDWARES,
  HARDWARE_ERROR,
  ADD_HARDWARE
} from '../constants';

export const getHardwares = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/hardware');

    dispatch({
      type: GET_HARDWARES,
      payload: res.data
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: HARDWARE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      console.error(err);
    }
  }
};

export const addHardware = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/api/hardware/add-hardware',
      formData,
      config
    );
    if (!res) {
      throw new Error('Bloga užklausa į serverį');
    }
    dispatch({
      type: ADD_HARDWARE,
      payload: res.data
    });

    dispatch(setAlert('Įranga pridėta', 'success'));
  } catch (err) {
    dispatch({
      type: HARDWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
