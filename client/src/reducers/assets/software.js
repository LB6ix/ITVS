import {
  GET_SOFTWARES,
  GET_USER_SOFTWARES,
  GET_SOFTWARE,
  CLEAR_SOFTWARE,
  CLEAR_SOFTWARES,
  SOFTWARE_ERROR,
  DELETE_SOFTWARE,
  ADD_SOFTWARE
} from '../../actions/constants';

const initialState = {
  softwares: [],
  software: null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SOFTWARES:
      return {
        ...state,
        softwares: payload,
        loading: false
      };
    case CLEAR_SOFTWARE:
      return {
        ...state,
        software: null,
        loading: false
      };
    case GET_SOFTWARE:
      return {
        ...state,
        softwares: payload,
        loading: false
      };
    case ADD_SOFTWARE:
      return {
        ...state,
        softwares: [payload, ...state.softwares],
        loading: false
      };
    case DELETE_SOFTWARE:
      return {
        ...state,
        softwares: state.softwares.filter(
          (software) => software._id !== payload
        ),
        loading: false
      };
    case SOFTWARE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
