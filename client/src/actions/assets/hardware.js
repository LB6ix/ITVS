import axios from 'axios';
import { setAlert } from '../alert';
import {
  GET_HARDWARES,
  GET_USER_HARDWARES,
  GET_HARDWARE,
  CLEAR_HARDWARE,
  HARDWARE_ERROR,
  DELETE_HARDWARE,
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
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: HARDWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editHardware = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/hardware/edit/${id}`, formData, config);
    dispatch({
      type: GET_HARDWARE,
      payload: res.data
    });

    dispatch(setAlert('Įrangos duomenys atnaujinti!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: HARDWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const checkOutHardware = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/hardware/${id}/checkout`,
      formData,
      config
    );
    dispatch({
      type: GET_HARDWARE,
      payload: res.data
    });

    dispatch(setAlert('Įranga priskirta!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: HARDWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const checkInHardware = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/hardware/${id}/checkin`,
      formData,
      config
    );
    dispatch({
      type: GET_HARDWARE,
      payload: res.data
    });

    dispatch(setAlert('Įranga atsiimta!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: HARDWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getHardware = (id) => async (dispatch) => {
  // // dispatch({
  // //   type: CLEAR_HARDWARE
  // });
  try {
    const res = await axios.get(`/api/hardware/single/${id}`);

    dispatch({
      type: GET_HARDWARE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
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

export const getUserHardwares = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/hardware/${id}`);

    dispatch({
      type: GET_USER_HARDWARES,
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

export const deleteHardware = (id) => async (dispatch) => {
  if (window.confirm('Tikrai?')) {
    try {
      await axios.delete(`/api/hardware/${id}`);

      dispatch({
        type: DELETE_HARDWARE,
        payload: id
      });

      dispatch(setAlert('Įranga pašalinta', 'success'));
    } catch (err) {
      dispatch({
        type: HARDWARE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
