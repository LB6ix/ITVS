import {
  GET_HARDWARES,
  GET_USER_HARDWARES,
  GET_HARDWARE,
  CLEAR_HARDWARE,
  CLEAR_HARDWARES,
  HARDWARE_ERROR,
  DELETE_HARDWARE,
  ADD_HARDWARE,
  HARDWARE_CHECKEDIN,
  HARDWARE_CHECKEDOUT,
  ADD_HARDWARE_NOTE,
  REMOVE_HARDWARE_NOTE,
  HARDWARE_NOTE_ERROR
} from '../../actions/constants';

const initialState = {
  hardwares: [],
  hardware: null,
  loading: true,
  error: {}
};

function hardwareReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_HARDWARE:
      return {
        ...state,
        hardware: null,
        loading: false
      };
    case CLEAR_HARDWARES:
      return {
        ...state,
        hardwares: [],
        loading: false
      };
    case GET_HARDWARES:
    case GET_USER_HARDWARES:
      return {
        ...state,
        hardwares: payload,
        loading: false
      };
    case CLEAR_HARDWARE:
      return {
        ...state,
        hardware: null,
        loading: false
      };
    case HARDWARE_CHECKEDIN:
    case HARDWARE_CHECKEDOUT:
    case GET_HARDWARE:
      return {
        ...state,
        hardware: payload,
        loading: false
      };
    case ADD_HARDWARE:
      return {
        ...state,
        hardwares: [payload, ...state.hardwares],
        loading: false
      };
    case HARDWARE_NOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_HARDWARE_NOTE:
      return {
        ...state,
        hardware: { ...state.hardware, comments: payload },
        loading: false
      };
    case REMOVE_HARDWARE_NOTE:
      return {
        ...state,
        hardware: {
          ...state.hardware,
          comments: state.hardware.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    case DELETE_HARDWARE:
      return {
        ...state,
        hardwares: state.hardwares.filter(
          (hardware) => hardware._id !== payload
        ),
        loading: false
      };
    case HARDWARE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default hardwareReducer;
