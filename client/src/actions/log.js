import axios from 'axios';
import { setAlert } from './alert';
import { GET_LOGS, LOG_ERROR } from './constants';

export const getLogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/logs');

    dispatch({
      type: GET_LOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
