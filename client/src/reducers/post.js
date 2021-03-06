import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  COMMENT_ERROR,
  CLEAR_POSTS,
  CLEAR_POST,
  GET_USER_POSTS
} from '../actions/constants';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_POSTS:
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], //assign current array to new post
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
    case COMMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    case CLEAR_POSTS:
      return {
        ...state,
        post: null,
        posts: [],
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
