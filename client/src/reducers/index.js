import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import hardware from './assets/hardware';
import software from './assets/software';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  hardware,
  software
});
