import axios from 'axios';
import { setAlert } from '../alert';
import {
  GET_HARDWARES,
  GET_USER_HARDWARES,
  GET_HARDWARE,
  CLEAR_HARDWARE,
  CLEAR_HARDWARES,
  HARDWARE_ERROR
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
