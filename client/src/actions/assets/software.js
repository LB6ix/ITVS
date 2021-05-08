import axios from 'axios';
import { setAlert } from '../alert';
import {
  GET_SOFTWARES,
  //GET_USER_SOFTWARES,
  GET_SOFTWARE,
  CLEAR_SOFTWARE,
  CLEAR_SOFTWARES,
  SOFTWARE_CHECKEDIN,
  SOFTWARE_CHECKEDOUT,
  SOFTWARE_ERROR,
  DELETE_SOFTWARE,
  ADD_SOFTWARE
} from '../constants';

export const getSoftwares = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_SOFTWARE
    });
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
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SOFTWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editSoftware = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/software/edit/${id}`, formData, config);
    dispatch({
      type: GET_SOFTWARE,
      payload: res.data
    });

    dispatch(setAlert('Įrangos duomenys atnaujinti!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SOFTWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getSoftware = (id) => async (dispatch) => {
  dispatch({
    type: CLEAR_SOFTWARE
  });
  try {
    const res = await axios.get(`/api/software/single/${id}`);

    dispatch({
      type: GET_SOFTWARE,
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

export const deleteSoftware = (id) => async (dispatch) => {
  if (window.confirm('Tikrai?')) {
    try {
      await axios.delete(`/api/software/${id}`);

      dispatch({
        type: DELETE_SOFTWARE,
        payload: id
      });

      dispatch(setAlert('Įranga pašalinta', 'success'));
    } catch (err) {
      dispatch({
        type: SOFTWARE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

export const checkOutSoftware = (formData, id) => async (dispatch) => {
  try {
    // dispatch({
    //   type: CLEAR_SOFTWARES
    // });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/software/${id}/checkout`,
      formData,
      config
    );
    dispatch({
      type: SOFTWARE_CHECKEDOUT,
      payload: res.data
    });

    dispatch(setAlert('Programos licencija priskirta!', 'success'));
    dispatch({
      type: CLEAR_SOFTWARE
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SOFTWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const checkInSoftware = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/software/${id}/checkin`,
      formData,
      config
    );
    dispatch({
      type: SOFTWARE_CHECKEDIN,

      payload: res.data
    });
    dispatch(setAlert('Programos licencija atsiimta!', 'success'));
    dispatch({
      // type: CLEAR_SOFTWARES,
      type: CLEAR_SOFTWARE
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SOFTWARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
