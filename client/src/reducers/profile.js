import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  UPDATE_PROFILE,
  ACCOUNT_DELETED
} from '../actions/constants';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.user._id !== payload
        ),
        loading: false
      };
    default:
      return state;
  }
}
