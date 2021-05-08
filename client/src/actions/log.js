import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LOGS,
  LOG_ERROR,
  LOGS_EXPORTED,
  LOG_EXPORT_ERROR
} from './constants';

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

export const exportLogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/logs/excel');

    dispatch({
      type: LOGS_EXPORTED,
      payload: res.data
    });
    dispatch(setAlert('Žurnalo įrašai eksportuoti .xlsx formatu', 'success'));
  } catch (err) {
    dispatch({
      type: LOG_EXPORT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
