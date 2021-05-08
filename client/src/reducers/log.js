import { GET_LOGS, LOG_ERROR } from '../actions/constants';

const initialState = {
  logs: [],
  loading: true,
  error: {}
};

function logReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOGS:
      return {
        ...state,
        logs: payload,
        loading: false
      };
    case LOG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default logReducer;
