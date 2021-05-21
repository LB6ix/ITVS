import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  CLEAR_POST,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  COMMENT_ERROR,
  GET_USER_POSTS
} from './constants';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_POST
    });
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/posts/', formData, config);
    if (!res) {
      throw new Error('Bloga užklausa į serverį');
    }
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Prašymas sukurtas', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Prašymas pašalintas', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_POST
    });
    const res = await axios.get(`/api/posts/userposts/${id}`);

    dispatch({
      type: GET_USER_POSTS,
      payload: res.data
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      console.error(err);
    }
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Pastaba pridėta', 'success'));
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Pastaba ištrinta', 'success'));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
