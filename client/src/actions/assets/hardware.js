import axios from 'axios';
import { setAlert } from '../alert';
import {
  GET_HARDWARES,
  GET_USER_HARDWARES,
  GET_HARDWARE,
  CLEAR_HARDWARE,
  HARDWARE_ERROR,
  DELETE_HARDWARE,
  ADD_HARDWARE,
  HARDWARE_CHECKEDIN,
  HARDWARE_CHECKEDOUT,
  ADD_HARDWARE_NOTE,
  REMOVE_HARDWARE_NOTE,
  HARDWARE_NOTE_ERROR
} from '../constants';

export const getHardwares = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_HARDWARE
    });
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

    const res = await axios.put(`/api/hardware/edit/${id}`, formData, config);
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
    // dispatch({
    //   type: CLEAR_HARDWARES
    // });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/hardware/${id}/checkout`,
      formData,
      config
    );
    dispatch({
      type: HARDWARE_CHECKEDOUT,
      payload: res.data
    });
    // getHardwares();
    dispatch(setAlert('Įranga priskirta!', 'success'));
    dispatch({
      // type: CLEAR_HARDWARES,
      type: CLEAR_HARDWARE
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: HARDWARE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      console.error(err);
    }
  }
};

export const checkInHardware = (formData, id) => async (dispatch) => {
  // dispatch({
  //   type: CLEAR_HARDWARES
  // });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/hardware/${id}/checkin`,
      formData,
      config
    );
    dispatch({
      type: HARDWARE_CHECKEDIN,

      payload: res.data
    });
    dispatch(setAlert('Įranga atsiimta!', 'success'));
    dispatch({
      // type: CLEAR_HARDWARES,
      type: CLEAR_HARDWARE
    });
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
  if (window.confirm('Tikrai norite ištrinti įrašą?')) {
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

export const addComment = (hardwareId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/hardware/comment/${hardwareId}`,
      formData
    );

    dispatch({
      type: ADD_HARDWARE_NOTE,
      payload: res.data
    });

    dispatch(setAlert('Įrangos pastaba pridėta', 'success'));
  } catch (err) {
    dispatch({
      type: HARDWARE_NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (hardwareId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/hardware/comment/${hardwareId}/${commentId}`);

    dispatch({
      type: REMOVE_HARDWARE_NOTE,
      payload: commentId
    });

    dispatch(setAlert('Įrangos pastaba ištrinta', 'success'));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: HARDWARE_NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
